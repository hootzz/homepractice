'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {useWorkbook} from './WorkbookProvider';
import {sessions,schemas} from '@/content/workbook';
import {presentations} from '@/content/presentation';
import {entrySchemas as legacySchemas} from '@/content/entrySchemas';
import {resolveContext} from '@/lib/access';
import {addEntry,editEntry,removeEntry} from '@/lib/workbookStorage';
import type {Entry,EntrySchema} from '@/lib/types';
import {Closed} from './WorkbookScreens';
import {RecordPdfExport} from './RecordPdfExport';
const date=(value:string)=>Number.isNaN(Date.parse(value))?value:new Date(value).toLocaleDateString('ko-KR',{year:'numeric',month:'long',day:'numeric'});
/** Prefer what the person wrote at length over a short context field (e.g. the chosen anchor). */
const preview=(e:Entry)=>{const shortKeys=new Set(schemas.find(s=>s.id===e.schemaId)?.questions.filter(q=>q.multiline===false).map(q=>q.key));const vals=Object.entries(e.responses).filter(([,v])=>v.trim());return (vals.find(([k])=>!shortKeys.has(k))??vals[0])?.[1]??'이전에 남긴 빈 기록';};
const title=(e:Entry)=>e.practiceNameSnapshot??sessions.find(s=>s.id===e.sessionId)?.user_facing_name??e.practiceId??'이전 기록';
function entrySchema(entry:Entry):EntrySchema {
  const source=schemas.find(s=>s.id===entry.schemaId)??legacySchemas.find(s=>s.id===entry.schemaId);
  const keys=[...new Set([...(source?.questions.map(q=>q.key)??[]),...Object.keys(entry.responses)])];
  return {id:entry.schemaId,title:title(entry),questions:keys.map(key=>({key,label:entry.questionSnapshot?.[key]??source?.questions.find(q=>q.key===key)?.label??key,multiline:true}))};
}
const SAVE_ERROR='저장하지 못했어요. 적은 내용은 화면에 남아 있어요. 다시 시도해 주세요.';
/** Shows `primaryKeys` (1–2 reflection questions) first; the rest of the schema stays
 *  available under "더 남기기". Short context fields are one-line inputs. */
export function EntryForm({schema,sessionId,practiceId,weeklyTaskId,practiceName,entry,primaryKeys,initial,inline=false,focusOnMount=false,cancelLabel,backHref,onSaved,onCancel}:{schema:EntrySchema;sessionId?:string;practiceId?:string;weeklyTaskId?:string;practiceName?:string;entry?:Entry;primaryKeys?:string[];initial?:Record<string,string>;inline?:boolean;focusOnMount?:boolean;cancelLabel?:string;backHref?:string;onSaved?:()=>void;onCancel?:()=>void}) {
  const {release,change}=useWorkbook();const [responses,setResponses]=useState<Record<string,string>>(entry?.responses??initial??{}),[saved,setSaved]=useState(''),[error,setError]=useState('');
  const back=backHref??(sessionId?`/sessions/${sessionId}`:'/entries');
  const firstLabel=useRef<HTMLLabelElement>(null);
  useEffect(()=>{if(focusOnMount)firstLabel.current?.focus();},[focusOnMount]);
  const Heading=inline?'h2':'h1';
  if(saved)return <div className={`section notice${inline?' reveal':''}`} role="status"><Heading>{saved}</Heading><div className="actions">{saved==='저장했어요.'?<><Link className="button" href="/entries">기록 보기</Link><Link className="text-link" href={back}>{inline?'여기서 마치기':'이야기로 돌아가기'}</Link></>
      // Nothing was written: there is no record to look at.
      :<Link className="button secondary" href={back}>{inline?'여기서 마치기':'이야기로 돌아가기'}</Link>}</div></div>;
  const lead=primaryKeys?.length?schema.questions.filter(q=>primaryKeys.includes(q.key)).sort((a,b)=>primaryKeys.indexOf(a.key)-primaryKeys.indexOf(b.key)):schema.questions.slice(0,1);
  const rest=schema.questions.filter(q=>!lead.includes(q));
  function question(q:EntrySchema['questions'][number],i:number) {
    const id=`answer-${q.key}`,set=(v:string)=>setResponses({...responses,[q.key]:v});
    return <div className={`field${q.multiline===false?' short':''}`} key={q.key}><label ref={i===0?firstLabel:undefined} tabIndex={i===0?-1:undefined} htmlFor={id}>{q.label} <small>(선택)</small></label>
      {q.multiline===false?<input id={id} value={responses[q.key]??''} onChange={e=>set(e.target.value)}/>
        :<><textarea id={id} value={responses[q.key]??''} onChange={e=>set(e.target.value)} rows={3}/><button className="text-link" type="button" onClick={()=>set(responses[q.key]?.trim()?`${responses[q.key]}\n잘 모르겠어요`:'잘 모르겠어요')}>잘 모르겠어요</button></>}</div>;
  }
  return <form className={inline?'reflection-form reveal':'section'} onSubmit={e=>{e.preventDefault();setError('');if(!entry&&!Object.values(responses).some(v=>v.trim())){setSaved('기록 없이 마쳐도 괜찮아요.');return;}try{const now=new Date().toISOString();if(entry)change(s=>editEntry(s,entry.id,responses,now));else {const id=crypto.randomUUID();change(s=>addEntry(s,release,{schemaId:schema.id,sessionId,practiceId,weeklyTaskId,responses,practiceNameSnapshot:practiceName,questionSnapshot:Object.fromEntries(schema.questions.map(q=>[q.key,q.label]))},id,now));}setSaved('저장했어요.');onSaved?.();}catch(e){setError(e instanceof Error&&/[가-힣]/.test(e.message)&&!e.message.startsWith('저장하지 못했어요')?`${e.message} 적은 내용은 화면에 남아 있어요.`:SAVE_ERROR);}}}>
    {!inline&&<><p className="eyebrow">경험 남기기</p><h1>{schema.title}</h1></>}<p className="muted">{inline?'원하는 만큼만 적어요. 잘했는지 평가하지 않아요.':'남기고 싶은 만큼만 적어요. 잘했는지 평가하지 않아요.'}</p>
    {lead.map(question)}{rest.length>0&&<details className="more-fields" open={entry?true:undefined}><summary>더 남기기</summary>{rest.map((q,i)=>question(q,i+lead.length))}</details>}
    {error&&<p className="error" role="alert">{error}</p>}<div className="actions"><button className="button" type="submit">기록 저장</button>{onCancel?<button className="text-link" type="button" onClick={onCancel}>{cancelLabel??(entry?'수정 취소':'기록 없이 돌아가기')}</button>:!inline&&<Link className="text-link" href={back}>기록 없이 돌아가기</Link>}</div><p className="muted privacy-note">기록은 이 브라우저에만 저장됩니다.</p>
  </form>;
}
export function NewEntryView({query}:{query:{session?:string;practice?:string;task?:string}}) {
  const {store,release}=useWorkbook();if(!store)return null;
  const task=query.task??(!query.practice&&query.session?release.bundles.find(b=>b.sessionId===query.session)?.sessionSpecificTaskId:undefined);
  const content=resolveContext(release,store.progress,{practiceId:query.practice,weeklyTaskId:task});
  if(!content)return <Closed/>;const sessionId='sessionId' in content?content.sessionId:content.introducedSessionId;
  if(query.session&&query.session!==sessionId)return <Closed/>;
  const schema=schemas.find(s=>s.id===content.recordSchemaId);if(!schema)return <Closed missing/>;
  return <EntryForm key={content.id} schema={schema} sessionId={sessionId} practiceId={query.practice} weeklyTaskId={task} practiceName={content.user_facing_name} primaryKeys={presentations[content.id]?.record?.lead}/>;
}
export function EntryList(){
  const {store}=useWorkbook();const [filter,setFilter]=useState('all');if(!store)return null;
  const entries=store.entries.filter(e=>filter==='all'||e.sessionId===filter).slice().sort((a,b)=>b.createdAt.localeCompare(a.createdAt));
  return <><div className="intro"><p className="eyebrow">나의 워크북</p><h1>남겨둔 경험</h1><p>그때 알아차린 것을 천천히 다시 읽어보세요.</p></div>{store.entries.length>0&&<div className="field"><label htmlFor="record-session">이야기로 찾아보기</label><select id="record-session" value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">모든 기록</option>{sessions.map(s=><option key={s.id} value={s.id}>{s.order}번째 이야기</option>)}</select></div>}
    {entries.length===0?<div className="empty"><p>아직 남긴 기록이 없어요.</p><p>적고 싶은 경험이 생기면 남겨주세요.</p><Link className="text-link" href="/sessions">이야기 펼쳐보기 →</Link></div>:<ol className="entry-list">{entries.map(e=><li key={e.id}><Link className="entry-row" href={`/entries/${e.id}`}><time dateTime={e.createdAt}>{date(e.createdAt)}</time><h2>{title(e)}</h2><p className="preview">{preview(e)}</p><span className="text-link">다시 읽기 →</span></Link></li>)}</ol>}{store.entries.length>0&&<RecordPdfExport/>}
  </>;
}
export function EntryDetail({id}:{id:string}) {
  const {store,change}=useWorkbook();const [editing,setEditing]=useState(false),[error,setError]=useState('');if(!store)return null;
  const entry=store.entries.find(e=>e.id===id);if(!entry)return <div className="empty"><h1>기록을 찾을 수 없어요</h1><Link className="text-link" href="/entries">기록 보기 →</Link></div>;
  const schema=entrySchema(entry);if(editing)return <EntryForm key={entry.id} schema={schema} entry={entry} sessionId={entry.sessionId} onSaved={()=>setEditing(false)} onCancel={()=>setEditing(false)}/>;
  return <><Link className="text-link" href="/entries">← 기록</Link><section className="section"><p className="eyebrow">{date(entry.createdAt)}</p><h1>{title(entry)}</h1>{Object.entries(entry.responses).filter(([,v])=>v.trim()).map(([key,value])=><div className="section" key={key}><h2>{schema.questions.find(q=>q.key===key)?.label??key}</h2><p className="response">{value}</p></div>)}{error&&<p role="alert" className="error">{error}</p>}<div className="actions"><button className="button secondary" onClick={()=>setEditing(true)}>수정</button><button className="text-link" onClick={()=>{if(window.confirm('이 기록을 삭제할까요? 지운 기록은 되돌릴 수 없어요.'))try{change(s=>removeEntry(s,entry.id));}catch{setError('삭제하지 못했어요. 기록은 그대로 남아 있어요.');}}}>삭제</button></div></section></>;
}
