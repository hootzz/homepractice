/* eslint-disable @typescript-eslint/no-require-imports, @next/next/no-assign-module-variable */
// Execute the actual TypeScript domain modules without adding test dependencies.
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const ts=require('typescript');
const cache=new Map();
function load(file){file=path.resolve(file);if(cache.has(file))return cache.get(file).exports;const module={exports:{}};cache.set(file,module);
  const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
  vm.runInThisContext('(function(require,module,exports){'+code+'\n})',{filename:file})(id=>load(path.resolve(path.dirname(file),id+'.ts')),module,module.exports);return module.exports;
}
const data=load('src/content/workbook.ts'), access=load('src/lib/access.ts'), storage=load('src/lib/workbookStorage.ts'), adapter=load('src/lib/gameAdapter.ts'), pdf=load('src/lib/recordPdf.ts');
const release=data.getRelease('demo');
const now='2026-10-05T12:00:00Z';
class MemoryStorage{constructor(values={}){this.values={...values};this.fail=false;}getItem(k){return this.values[k]??null;}setItem(k,v){if(this.fail)throw new Error('QuotaExceeded');this.values[k]=v;}}
function fresh(){const port=new MemoryStorage();return {port,store:storage.loadWorkbook('demo',release,port)};}
const input={weeklyTaskId:'week_3',schemaId:'attention',responses:{attention_went:'잘 모르겠어요'},questionSnapshot:{attention_went:'마음은 어디로 갔나요?'},practiceNameSnapshot:'마음이 간 곳 알아보기'};
test('published manifest integrity; S8 has no new Regular; pending catalog excluded',()=>{
  access.validateRelease(release);assert.deepEqual(release.bundles.find(b=>b.sessionId==='s8').regularPracticeIds,[]);
  assert.deepEqual(release.practices.map(p=>p.id),['walking_return','breathing_space']);
  assert.equal(data.getRelease('actual').practices.length,0);
});
test('only exact completed session unlocks; URL/current page cannot unlock',()=>{
  const p=release.practices[0];assert.equal(access.canAccessPractice(p,{completedSessionIds:['s1','s8']}),false);
  assert.equal(access.canAccessPractice(p,{completedSessionIds:['s3']}),true);
  assert.equal(access.resolveContext(release,{completedSessionIds:[]},{practiceId:p.id}),undefined);
  assert.equal(access.resolveContext(release,{completedSessionIds:['s3']},{practiceId:'body_scan'}),undefined);
  assert.equal(access.resolveContext(release,{completedSessionIds:['s3']},{practiceId:p.id,weeklyTaskId:'week_3'}),undefined);
});
test('completion is monotonic, idempotent and never infers other sessions',()=>{
  let progress={completedSessionIds:[]};progress=adapter.completeSession(progress,'s3');assert.deepEqual(progress.completedSessionIds,['s3']);
  progress=adapter.completeSession(progress,'s3');assert.deepEqual(progress.completedSessionIds,['s3']);
  progress=adapter.completeSession(progress,'s8');assert.equal(access.repertoire(release,progress).length,2);
  assert.throws(()=>adapter.completeSession(progress,'s9'));
});
test('Kit S8 gate, optional fields, deduplication, removal preserves repertoire',()=>{
  let {store}=fresh();assert.throws(()=>storage.saveKit(store,release,{practiceId:'walking_return'}));
  store=storage.addCompletion(store,'s7','demo');assert.throws(()=>storage.saveKit(store,release,{practiceId:'walking_return'}));
  store=storage.addCompletion(store,'s8','demo');store=storage.saveKit(store,release,{practiceId:'walking_return'});
  store=storage.saveKit(store,release,{practiceId:'walking_return',cue:'',situation:'이동할 때',personalReason:'나의 이유'});
  assert.equal(store.kit.items.length,1);assert.equal(store.kit.items[0].situation,'이동할 때');
  assert.throws(()=>storage.saveKit(store,release,{practiceId:'week_3'}));
  const before=access.repertoire(release,store.progress);store=storage.removeKit(store,'walking_return');assert.deepEqual(access.repertoire(release,store.progress),before);
});
test('S8 alone does not manufacture candidates',()=>{
  let {store}=fresh();store={...store,progress:{completedSessionIds:['s8']}};
  assert.equal(access.repertoire(release,store.progress).length,0);assert.throws(()=>storage.saveKit(store,release,{practiceId:'walking_return'}));
});
test('records CRUD / blank optional / unknown valid / no completion side effect',()=>{
  let {store}=fresh();const progress=JSON.stringify(store.progress);
  assert.equal(storage.addEntry(store,release,{...input,responses:{attention_went:' \n '}},'blank',now),store);
  store=storage.addEntry(store,release,input,'e1',now);assert.equal(store.entries.length,1);assert.equal(store.entries[0].sessionId,'s3');
  store=storage.editEntry(store,'e1',{attention_went:'바뀐 원문\n줄바꿈'},now);assert.equal(store.entries[0].responses.attention_went,'바뀐 원문\n줄바꿈');
  assert.throws(()=>storage.editEntry(store,'e1',{attention_went:' '},now));
  store=storage.removeEntry(store,'e1');assert.equal(store.entries.length,0);assert.equal(JSON.stringify(store.progress),progress);
  assert.throws(()=>storage.addEntry(store,release,{...input,weeklyTaskId:'week_8'},'bad',now));
});
test('actual/demo namespaces independent; adapter remains blocked',()=>{
  const {port}=fresh(),actualRelease=data.getRelease('actual');const actual=storage.loadWorkbook('actual',actualRelease,port);
  assert.deepEqual(actual.progress.completedSessionIds,[]);assert.throws(()=>storage.addCompletion(actual,'s8','demo'));
  const changed=storage.addCompletion(actual,'s3','game');assert.deepEqual(changed.progress.completedSessionIds,['s3']);
  assert.notEqual(storage.storeKey('actual'),storage.storeKey('demo'));assert.equal(adapter.gameCompletionAdapter.status,'BLOCKED_GAME_COMPLETION_SYNC');
  assert.equal(adapter.BLOCKED_GAME_KIT_SYNC,'BLOCKED_GAME_KIT_SYNC');
});
test('v1 migration preserves raw originals, excluded practice, unknown answers, legacy plans; idempotent',()=>{
  const entry={id:'old',sessionId:'s2',practiceId:'retired_practice',schemaId:'unknown_schema',responses:{old_question:'원문  그대로\n보존'},createdAt:now,updatedAt:now};
  const old=JSON.stringify([entry]),plans=JSON.stringify([{id:'plan',practiceId:'body_scan',cue:'저녁'}]);
  const port=new MemoryStorage({'mindforest.entries.v1':old,'mindforest.practicePlans.v1':plans,'mindforest.settings.v1':'{"currentSession":8}'});
  const store=storage.loadWorkbook('demo',release,port);assert.equal(store.entries[0].responses.old_question,entry.responses.old_question);assert.equal(store.entries[0].questionSnapshot.old_question,'old_question');
  assert.equal(port.getItem('mindforest.entries.v1'),old);assert.equal(store.legacy.rawSnapshots['mindforest.entries.v1'],old);
  assert.equal(store.kit.items.length,0);assert.equal(store.legacy.plans.length,1);assert(!store.progress.completedSessionIds.includes('s8'));
  assert.equal(storage.loadWorkbook('demo',release,port).entries.length,1);
  assert.equal(storage.loadWorkbook('actual',data.getRelease('actual'),port).entries.length,0);
  assert.equal(storage.editEntry(store,'old',{old_question:'수정'},now).entries[0].responses.old_question,'수정');
});
test('malformed legacy data is backed up, malformed v3 is not overwritten',()=>{
  const port=new MemoryStorage({'mindforest.entries.v1':'{broken'});const store=storage.loadWorkbook('demo',release,port);
  assert.equal(store.legacy.unreadableCount,1);assert.equal(store.legacy.rawSnapshots['mindforest.entries.v1'],'{broken');
  port.values[storage.storeKey('demo')]='{broken-current';assert.throws(()=>storage.loadWorkbook('demo',release,port));assert.equal(port.values[storage.storeKey('demo')],'{broken-current');
});
test('v2 structured records and explicit completions migrate without interpreting receipts',()=>{
  const source={mode:'actual',progress:{completedSessionIds:['s2'],receipts:[{actionId:'anything'}]},entries:[{id:'v2',sessionId:'s2',context:{kind:'weekly_task',weeklyTaskId:'week_2'},schemaId:'old',createdAt:now,updatedAt:now,answers:{body:{kind:'text',value:'몸의 감각'},uncertain:{kind:'unknown'},custom:{kind:'choice',value:'other',customText:'나의 표현'}}}]};
  const port=new MemoryStorage({'mindforest.home.v2.actual':JSON.stringify(source)}),store=storage.loadWorkbook('actual',data.getRelease('actual'),port);
  assert.deepEqual(store.progress.completedSessionIds,['s2']);assert.equal(store.entries[0].responses.uncertain,'잘 모르겠어요');assert.equal(store.entries[0].responses.custom,'나의 표현');assert.equal(store.entries[0].weeklyTaskId,'week_2');
  assert.deepEqual(store.kit.items,[]);
});
test('failed migration / commit do not destroy legacy or saved records',()=>{
  const port=new MemoryStorage({'mindforest.entries.v1':'[]'});port.fail=true;assert.throws(()=>storage.loadWorkbook('demo',release,port));assert.equal(port.values['mindforest.entries.v1'],'[]');assert.equal(port.getItem(storage.storeKey('demo')),null);
  port.fail=false;storage.loadWorkbook('demo',release,port);const raw=port.getItem(storage.storeKey('demo'));port.fail=true;
  assert.throws(()=>storage.commitWorkbook('demo',release,port,s=>storage.addEntry(s,release,input,'e1',now)));assert.equal(port.getItem(storage.storeKey('demo')),raw);
});
test('new Kit + authored questions/answers only in PDF; sorted sessions and no hidden state',()=>{
  const entry=(id,sessionId,responses)=>({id,sessionId,schemaId:'attention',createdAt:now,updatedAt:now,responses,questionSnapshot:{q:'당시의 질문'},practiceNameSnapshot:'당시의 연습'});
  const entries=[entry('8','s8',{q:'마지막'}),entry('1','s1',{q:'첫 기록\n잘 모르겠어요'}),entry('empty','s2',{q:' '}),entry('old','unknown',{custom:'예전 답변'})];
  const kit=[{practiceId:'walking_return',cue:'아침',situation:'학교',personalReason:'내 이유'}];
  const blocks=pdf.recordExportBlocks(entries,kit,now,[],{walking_return:'걸으며 돌아오기'}),all=blocks.map(b=>b.text).join('\n');
  assert(all.indexOf('Session 1')<all.indexOf('Session 8'));assert(!all.includes('Session 2'));assert(all.includes('당시의 질문'));assert(all.includes('첫 기록\n잘 모르겠어요'));assert(all.includes('custom'));assert(all.includes('예전 답변'));
  assert(all.includes('걸으며 돌아오기'));assert(all.includes('일상 상황: 학교'));assert(all.endsWith('나의 이유: 내 이유'));
  assert(!/completedSessionIds|rawSnapshots|streak|수행률|점수/.test(all));
});
test('PDF failures reject cleanly; multipage bounds and binary header verified with canvas surrogate',async()=>{
  const original=global.document;let pages=0;const drawn=[];
  global.document={fonts:{ready:Promise.resolve()},createElement:()=>({getContext:()=>null})};
  await assert.rejects(pdf.createRecordPdf([{kind:'title',text:'기록'}]),/Canvas/);
  const ctx={font:'',fillStyle:'',fillRect(){},measureText(s){return{width:Array.from(s).length*25}},fillText(s,x,y){assert(x>=0&&x<1240&&y<1754);drawn.push(s)}};
  global.document={fonts:{ready:Promise.resolve()},createElement:()=>({getContext:()=>ctx,toBlob:cb=>{pages++;cb(new Blob([new Uint8Array([255,216,255,217])],{type:'image/jpeg'}))}})};
  try{const result=await pdf.createRecordPdf([{kind:'title',text:'한글 기록'},{kind:'body',text:'긴 원문 '.repeat(2500)},{kind:'heading',text:'개인 Practice Kit'}]);assert(pages>2);assert.equal(result.type,'application/pdf');assert(Buffer.from(await result.arrayBuffer()).toString().startsWith('%PDF-1.4'));assert(drawn.includes('개인 Practice Kit'));}finally{global.document=original;}
});
const pres=load('src/content/presentation.ts'), audio=load('src/lib/audio.ts');
const allContent=()=>[...release.weeklyTasks,...release.practices];
test('every item: scene, 3–5 titled steps, one control on a real step, record keys exist',()=>{
  for(const c of allContent()){
    const p=pres.presentations[c.id];assert(p,`missing presentation ${c.id}`);assert(p.scene.alt.length>0,c.id);
    assert.equal(p.stepTitles.length,c.steps.length,c.id);assert(c.steps.length>=3&&c.steps.length<=5,`${c.id} has ${c.steps.length} steps`);
    if(p.control)assert(p.control.atStep>=0&&p.control.atStep<c.steps.length,c.id);
    const schema=data.schemas.find(s=>s.id===c.recordSchemaId);assert(schema,c.id);
    for(const k of p.record?.lead??[])assert(schema.questions.some(q=>q.key===k),`${c.id}:${k}`);
    if(p.control?.kind==='choice'){assert(p.control.options.length>=2&&p.control.options.length<=6,c.id);assert(schema.questions.some(q=>q.key===p.control.prefillKey),c.id);}
    if(p.scene.image){assert(fs.existsSync(path.join('public',p.scene.image.src)),p.scene.image.src);const r=p.scene.image.width/p.scene.image.height;assert(Math.abs(r-16/9)<0.02,`${c.id} ratio ${r}`);}
  }
});
test('record opens with one core question; a pre-filled context field is shown, never hidden',()=>{
  for(const t of release.weeklyTasks.filter(t=>t.id!=='week_4'&&t.id!=='week_8'))assert.equal(pres.recordLeadKeys(pres.presentations[t.id]).length,1,t.id);
  assert.deepEqual(pres.recordLeadKeys(pres.presentations.week_1,'object'),['object','overlooked']);
  assert.equal(pres.presentations.week_8.record,undefined);
  assert.equal(pres.recordLeadKeys(pres.presentations.week_4).length,4);
});
test('no "screen can be closed" copy anywhere; bridge phrase intact',()=>{
  assert.equal(pres.BRIDGE.join(' '),'숲에서 해본 걸, 오늘 한 번 더.');
  const all=JSON.stringify([pres.presentations,allContent(),data.sessions]);assert(!all.includes('화면은 닫아도'));
});
test('concrete titles, V3.3 animals, Korean canonical practice names',()=>{
  assert.deepEqual(data.sessions.map(s=>s.user_facing_name),['호두 관찰','몸 살피기','발걸음','반응의 흐름','비와 몸','생각구름','돌봄 행동','나의 Practice Kit']);
  assert.deepEqual(data.sessions.map(s=>s.animal),['다람쥐','거북이','사슴','곰','개구리','독수리','강아지','꿀벌']);
  for(const t of release.weeklyTasks)assert.equal(t.user_facing_name,data.sessions.find(s=>s.id===t.sessionId).user_facing_name);
  const w=release.practices.find(p=>p.id==='walking_return'),b=release.practices.find(p=>p.id==='breathing_space');
  assert.equal(w.user_facing_name,'마음챙김 걷기');assert.equal(w.mbct.canonicalName,'마음챙김 걷기');
  assert.equal(b.user_facing_name,'3단계 호흡 공간');assert.equal(b.mbct.canonicalName,'호흡 공간법');
});
test('audio: in-app guide only when practice match AND usage are confirmed; never a link-out',()=>{
  const base={...release.practices[0]};
  assert.equal(audio.audioState({...base,audio:undefined}).kind,'text_only');
  assert.equal(audio.audioState({...base,audio:{guide:{kind:'youtube',src:'x',language:'ko',credit:'c',practiceMatch:true,usageConfirmed:false}}}).kind,'text_only');
  const g=audio.audioState({...base,audio:{guide:{kind:'file',src:'/audio/x.mp3',language:'ko',credit:'c',practiceMatch:true,usageConfirmed:true}}});assert.equal(g.kind,'guide');assert.equal(g.source,'file');
  for(const p of release.practices){const a=audio.audioState(p);assert.equal(a.kind,'guide',p.id);assert.equal(a.language,'ko',p.id);assert.equal(a.source,'youtube',p.id);assert(/^[A-Za-z0-9_-]{11}$/.test(a.src),p.id);}
  assert.equal(audio.audioState(release.practices.find(p=>p.id==='breathing_space')).src,'n5Sg3KDaw64');assert.equal(audio.audioState(release.practices.find(p=>p.id==='walking_return')).src,'5ZXdug0sL0o');
});
test('earlier record schemas stay readable; ids unique',()=>{
  for(const id of ['sensory','body','attention','reactivity_v3','allowing_v3','thought_v3','care','integration'])assert(data.schemas.some(s=>s.id===id),id);
  assert.equal(new Set(data.schemas.map(s=>s.id)).size,data.schemas.length);
});
test('S6 breathing step only when Breathing Space is accessible; S4 stays Recognize; S8 kit step',()=>{
  const w6=release.weeklyTasks.find(t=>t.id==='week_6');
  assert.equal(pres.guidedSteps(w6,[]).length,4);assert(!pres.guidedSteps(w6,[]).some(s=>s.title==='숨 고르기'));
  assert.equal(pres.guidedSteps(w6,['breathing_space']).length,5);
  const w4=release.weeklyTasks.find(t=>t.id==='week_4');assert.deepEqual(w4.relatedPracticeIds,[]);assert(!w4.steps.join(' ').includes('호흡'));
  assert.equal(pres.presentations.week_8.kitStep,2);
  assert.equal(release.practices.find(p=>p.id==='breathing_space').steps.length,3);
});
test('user-facing copy contains no reward / evaluation / pressure language',()=>{
  // Image metadata (src, CSS focal point) is not copy; skip it.
  const strings=[];const walk=v=>{if(typeof v==='string')strings.push(v);else if(v&&typeof v==='object')Object.entries(v).forEach(([k,x])=>{if(k!=='image')walk(x);});};
  walk(pres.presentations);walk(allContent());walk(data.sessions);walk(data.schemas);
  const banned=/점수|뱃지|배지|스트릭|streak|획득|클리어|달성|정답|오답|성공|실패|완료율|퍼센트|%|XP|레벨|랭크|보상|빨리|서둘러|미션|견뎌|참아/i;
  assert.deepEqual(strings.filter(s=>banned.test(s)),[]);
});
