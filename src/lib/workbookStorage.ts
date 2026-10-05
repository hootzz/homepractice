import type { Entry } from './types';
import { entrySchemas as legacySchemas } from '../content/entrySchemas';
import { practices as legacyPractices } from '../content/practices';
import { sessions as legacySessions } from '../content/sessions';
import { SESSION_IDS, type WorkbookStore, type Mode, type ContentRelease, type SessionId, type KitItem } from './workbookTypes';
import { DEMO_COMPLETED_SESSIONS } from './config';
import { canSelectKit, canAccessPractice, resolveContext } from './access';
import { completeSession, demoCompletion } from './gameAdapter';
export interface StoragePort { getItem(key:string):string|null; setItem(key:string,value:string):void }
export const storeKey=(mode:Mode)=>`mindforest.home.v3.${mode}`;
const isObject=(x:unknown):x is Record<string,unknown>=>Boolean(x)&&typeof x==='object'&&!Array.isArray(x);
const stringMap=(x:unknown):x is Record<string,string>=>isObject(x)&&Object.values(x).every(v=>typeof v==='string');
function validEntry(x:unknown): x is Entry {
  return isObject(x)&&typeof x.id==='string'&&typeof x.schemaId==='string'&&typeof x.createdAt==='string'&&typeof x.updatedAt==='string'&&stringMap(x.responses)
    && ['sessionId','practiceId','weeklyTaskId','practiceNameSnapshot'].every(k=>x[k]===undefined||typeof x[k]==='string')
    && (x.questionSnapshot===undefined||stringMap(x.questionSnapshot));
}
function validKit(x:unknown):x is KitItem { return isObject(x)&&typeof x.practiceId==='string'&&['cue','situation','personalReason'].every(k=>x[k]===undefined||typeof x[k]==='string'); }
export function validateStore(value:unknown, mode:Mode, release:ContentRelease): asserts value is WorkbookStore {
  if (!isObject(value)||value.schemaVersion!==3||value.mode!==mode||value.contentReleaseId!==release.id||!isObject(value.progress)||!Array.isArray(value.progress.completedSessionIds)
    ||!value.progress.completedSessionIds.every(id=>SESSION_IDS.includes(id as SessionId))||new Set(value.progress.completedSessionIds).size!==value.progress.completedSessionIds.length
    ||!Array.isArray(value.entries)||!value.entries.every(validEntry)||new Set(value.entries.map(e=>e.id)).size!==value.entries.length
    ||!isObject(value.kit)||!Array.isArray(value.kit.items)||!value.kit.items.every(validKit)||new Set(value.kit.items.map(i=>i.practiceId)).size!==value.kit.items.length
    ||!isObject(value.legacy)||!stringMap(value.legacy.rawSnapshots)||!Array.isArray(value.legacy.plans)||typeof value.legacy.unreadableCount!=='number') throw new Error('저장된 자료의 형식을 확인하지 못했어요. 원본은 그대로 두었습니다.');
  const store=value as unknown as WorkbookStore;
  if(release.mode!==mode || store.kit.items.some(item=>!canSelectKit(store.progress)||!release.practices.some(p=>p.id===item.practiceId&&canAccessPractice(p,store.progress)))) throw new Error('저장된 연습 선택과 현재 콘텐츠를 확인해야 해요. 원본은 그대로 두었습니다.');
}
function snapshot(entry:Entry):Entry {
  const schema=legacySchemas.find(s=>s.id===entry.schemaId);
  const name=legacyPractices.find(p=>p.id===entry.practiceId)?.title ?? legacySessions.find(s=>s.id===entry.sessionId)?.representativeHomePractice.title;
  return {...entry,questionSnapshot:entry.questionSnapshot??Object.fromEntries(Object.keys(entry.responses).map(k=>[k,schema?.questions.find(q=>q.key===k)?.label??k])),practiceNameSnapshot:entry.practiceNameSnapshot??name,
    ...(entry.practiceId?.match(/^s[1-8]_home$/)?{weeklyTaskId:`week_${entry.practiceId[1]}`}:{})};
}
function recoverLegacyEntry(row:unknown):Entry|undefined {
  if(validEntry(row))return snapshot(row);
  if(!isObject(row)||typeof row.id!=='string'||typeof row.schemaId!=='string'||typeof row.createdAt!=='string'||typeof row.updatedAt!=='string'||!isObject(row.answers))return undefined;
  const responses:Record<string,string>={};
  for(const [key,answer] of Object.entries(row.answers)) {
    if(typeof answer==='string')responses[key]=answer;
    else if(isObject(answer)&&answer.kind==='unknown')responses[key]='잘 모르겠어요';
    else if(isObject(answer)&&(answer.kind==='text'||answer.kind==='choice')&&typeof answer.value==='string')responses[key]=typeof answer.customText==='string'?answer.customText:answer.value;
    else return undefined; // Unknown structure remains intact in the raw snapshot.
  }
  const context=isObject(row.context)?row.context:{};
  const e:Entry={id:row.id,schemaId:row.schemaId,createdAt:row.createdAt,updatedAt:row.updatedAt,responses};
  if(typeof row.sessionId==='string')e.sessionId=row.sessionId;
  if(typeof context.practiceId==='string')e.practiceId=context.practiceId;
  if(typeof context.weeklyTaskId==='string')e.weeklyTaskId=context.weeklyTaskId;
  if(stringMap(row.questionSnapshot))e.questionSnapshot=row.questionSnapshot;
  if(typeof row.practiceNameSnapshot==='string')e.practiceNameSnapshot=row.practiceNameSnapshot;
  return snapshot(e);
}
export function loadWorkbook(mode:Mode,release:ContentRelease,storage:StoragePort):WorkbookStore {
  if(release.mode!==mode)throw new Error('콘텐츠와 저장 공간이 일치하지 않아요.');
  const raw=storage.getItem(storeKey(mode));
  if(raw!==null){let parsed:unknown;try{parsed=JSON.parse(raw);}catch{throw new Error('저장된 자료를 읽지 못했어요. 원본을 그대로 두었습니다.');}validateStore(parsed,mode,release);return parsed;}
  const store:WorkbookStore={schemaVersion:3,mode,contentReleaseId:release.id,progress:{completedSessionIds:mode==='demo'?[...DEMO_COMPLETED_SESSIONS]:[]},entries:[],kit:{items:[]},legacy:{rawSnapshots:{},plans:[],unreadableCount:0}};
  // v1 was the local-only prototype. It is migrated only into demo, never actual.
  const keys=mode==='demo'?['mindforest.entries.v1','mindforest.practicePlans.v1','mindforest.settings.v1','mindforest.home.v2.demo']:['mindforest.home.v2.actual'];
  for(const key of keys){
    const old=storage.getItem(key);if(old===null)continue;store.legacy.rawSnapshots[key]=old;
    let parsed:unknown;try{parsed=JSON.parse(old);}catch{store.legacy.unreadableCount++;continue;}
    if(key==='mindforest.entries.v1'){
      if(!Array.isArray(parsed)){store.legacy.unreadableCount++;continue;}
      for(const row of parsed){if(validEntry(row)&&!store.entries.some(e=>e.id===row.id))store.entries.push(snapshot(row));else store.legacy.unreadableCount++;}
    } else if(key==='mindforest.practicePlans.v1') {
      if(Array.isArray(parsed))store.legacy.plans=parsed;else store.legacy.unreadableCount++;
    } else if(key.includes('.v2.')&&isObject(parsed)) {
      // Unimplemented prior contract may have structured answers: keep its raw
      // snapshot in all cases, lift only losslessly readable text entries.
      if(Array.isArray(parsed.entries)) for(const row of parsed.entries) {
        const recovered=recoverLegacyEntry(row);
        if(recovered&&!store.entries.some(e=>e.id===recovered.id))store.entries.push(recovered);else store.legacy.unreadableCount++;
      }
      // Copy explicit session-complete state only; receipts/current session never qualify.
      if(isObject(parsed.progress)&&Array.isArray(parsed.progress.completedSessionIds)&&parsed.progress.completedSessionIds.every(id=>SESSION_IDS.includes(id as SessionId)))store.progress.completedSessionIds=SESSION_IDS.filter(id=>(parsed.progress as {completedSessionIds:unknown[]}).completedSessionIds.includes(id));
    }
  }
  // A failed new write never removes or replaces any old key.
  storage.setItem(storeKey(mode),JSON.stringify(store));return store;
}
export function commitWorkbook(mode:Mode,release:ContentRelease,storage:StoragePort,change:(current:WorkbookStore)=>WorkbookStore):WorkbookStore {
  const current=loadWorkbook(mode,release,storage), next=change(current);
  validateStore(next,mode,release);storage.setItem(storeKey(mode),JSON.stringify(next));return next;
}
export function addCompletion(store:WorkbookStore,id:SessionId,source:'demo'|'game'):WorkbookStore {
  if(source==='demo')return {...store,progress:demoCompletion(store.mode,store.progress,id)};
  if(store.mode!=='actual')throw new Error('Actual completion cannot change demo');
  return {...store,progress:completeSession(store.progress,id)};
}
export function addEntry(store:WorkbookStore,release:ContentRelease,input:Omit<Entry,'id'|'createdAt'|'updatedAt'>,id:string,now:string):WorkbookStore {
  const context=resolveContext(release,store.progress,input);
  if(!context)throw new Error('아직 열린 연습이 아니에요.');
  if(!Object.values(input.responses).some(v=>v.trim()))return store;
  const sessionId='sessionId' in context?context.sessionId:context.introducedSessionId;
  return {...store,entries:[...store.entries,{...input,sessionId,id,createdAt:now,updatedAt:now}]};
}
export function editEntry(store:WorkbookStore,id:string,responses:Record<string,string>,now:string):WorkbookStore {
  if(!store.entries.some(e=>e.id===id))throw new Error('기록을 찾을 수 없어요.');
  if(!Object.values(responses).some(v=>v.trim()))throw new Error('비워 두려면 기록 목록에서 삭제를 선택해 주세요.');
  return {...store,entries:store.entries.map(e=>e.id===id?{...e,responses,updatedAt:now}:e)};
}
export function removeEntry(store:WorkbookStore,id:string):WorkbookStore { return {...store,entries:store.entries.filter(e=>e.id!==id)}; }
export function saveKit(store:WorkbookStore,release:ContentRelease,item:KitItem):WorkbookStore {
  const p=release.practices.find(p=>p.id===item.practiceId);
  if(!canSelectKit(store.progress)||!p||!canAccessPractice(p,store.progress))throw new Error('지금 선택할 수 있는 연습이 아니에요.');
  return {...store,kit:{items:store.kit.items.some(i=>i.practiceId===item.practiceId)?store.kit.items.map(i=>i.practiceId===item.practiceId?item:i):[...store.kit.items,item]}};
}
export function removeKit(store:WorkbookStore,id:string):WorkbookStore { return {...store,kit:{items:store.kit.items.filter(i=>i.practiceId!==id)}}; }
