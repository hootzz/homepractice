'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { BRIDGE, presentations, guidedSteps, recordLeadKeys, type HomePresentation } from '@/content/presentation';
import type { Practice, Session, WeeklyTask } from '@/lib/workbookTypes';
import type { EntrySchema } from '@/lib/types';
import { audioState, type AudioState } from '@/lib/audio';
import { SceneHero } from './SceneSketch';
import { EntryForm } from './WorkbookEntries';

// One page, three moments:
//   REMEMBER — the game scene, the bridge line and one primary action.
//   TRY      — a few short steps, one at a time; the scene compacts and focus follows.
//   REFLECT  — an optional trace, hidden until asked for.
// Nothing chosen or opened here is stored; only `기록 저장` writes a record.

interface Props {
  session: Session;
  content?: Practice | WeeklyTask;
  /** Accessible Regular practices (Repertoire). */
  accessible: Practice[];
  kitOpen: boolean;
  /** 'session' = daily-life practice from the game scene; 'practice' = formal Regular practice. */
  kind: 'session' | 'practice';
  back?: { href: string; label: string };
  eyebrow?: string;
  memory?: string;
  audio?: AudioState;
  record?: { schema?: EntrySchema; sessionId: string; practiceId?: string; weeklyTaskId?: string };
  /** Secondary area at the very bottom of TRY (e.g. formal practices opened in this session). */
  footer?: ReactNode;
}

function Choice({label,options,own,value,setValue}:{label:string;options:string[];own?:boolean;value:string;setValue:(v:string)=>void}) {
  const [isOwn,setOwn]=useState(false);
  return <div className="choice">
    <div className="chips" role="group" aria-label={label}>
      {options.map(o=><button key={o} type="button" className="chip" aria-pressed={!isOwn&&value===o} onClick={()=>{setOwn(false);setValue(value===o?'':o);}}>{o}</button>)}
      {own&&<button type="button" className="chip" aria-pressed={isOwn} aria-expanded={isOwn} onClick={()=>{setOwn(!isOwn);setValue('');}}>직접 고르기</button>}
    </div>
    {isOwn&&<div className="own-input"><label className="visually-hidden" htmlFor="choice-own">{label} 직접 적기</label><input id="choice-own" autoFocus value={value} onChange={e=>setValue(e.target.value)} placeholder="직접 적어 주세요"/></div>}
  </div>;
}

/** In-app guide audio. Plays here; never sends the person to another site. */
function GuideAudio({audio}:{audio?:AudioState}) {
  const [failed,setFailed]=useState(false);
  if(!audio||audio.kind!=='guide')return null;
  const label=audio.language==='ko'?'안내 듣기':'안내 듣기 · 영어';
  return <div className="guide-audio">
    <p className="guide-label">{label}</p>
    {audio.source==='file'
      ?<audio controls preload="none" src={audio.src} aria-label={label} onError={()=>setFailed(true)}/>
      :<div className="embed"><iframe src={`https://www.youtube-nocookie.com/embed/${audio.src}?rel=0&modestbranding=1&playsinline=1`} title={label} allow="encrypted-media; picture-in-picture" loading="lazy"/></div>}
    <small>{audio.credit}</small>
    {failed&&<p role="status" className="muted">안내를 불러오지 못했어요. 아래 글 안내로 이어가요.</p>}
  </div>;
}

function Steps({content,p,accessible,kitOpen,value,setValue}:{content:Practice|WeeklyTask;p?:HomePresentation;accessible:Practice[];kitOpen:boolean;value:string;setValue:(v:string)=>void}) {
  const steps=guidedSteps(content,accessible.map(a=>a.id));
  const [pos,setPos]=useState(0);const ref=useRef<HTMLHeadingElement>(null),moved=useRef(false);
  useEffect(()=>{if(moved.current)ref.current?.focus();},[pos]);
  const go=(n:number)=>{moved.current=true;setPos(n);};
  const [inline,setInline]=useState(false);
  const step=steps[pos],last=pos===steps.length-1,c=p?.control;
  const related=p?.practiceStep?.index===step.index?accessible.find(a=>a.id===p.practiceStep?.practiceId):undefined;
  const relatedTitles=related&&presentations[related.id]?.stepTitles;
  const recall=c?.kind==='choice'&&c.recall&&step.index>c.atStep&&value.trim()?{label:c.recall,value:value.trim()}:undefined;
  return <div className="stepper">
    {p?.flow&&<ol className="flow" aria-label="반응의 흐름">{p.stepTitles.map((t,i)=><li key={t} aria-current={i===step.index?'step':undefined}>{t}</li>)}</ol>}
    <div className="rise" key={pos}>
      {recall&&<p className="recall">{recall.label} · <strong>{recall.value}</strong></p>}
      {p?.flow
        // S4: the flow line already says where we are; the question itself is the heading.
        ?<h3 ref={ref} tabIndex={-1} className="today-text">{step.text}</h3>
        :<><h3 ref={ref} tabIndex={-1}><span className="step-count">{pos+1} / {steps.length}</span>{step.title}</h3><p className="today-text">{step.text}</p></>}
      {c&&c.atStep===step.index&&(c.kind==='choice'
        ?<Choice label={c.label} options={c.options} own={c.own} value={value} setValue={setValue}/>
        :<ul className="fields" aria-label="세 칸으로 나누기">{c.cells.map(x=><li key={x}>{x}</li>)}</ul>)}
      {related&&<>
        {/* The formal practice opens here, in full, so the session's place is not lost. */}
        <button type="button" className="button secondary step-action" aria-expanded={inline} aria-controls="inline-practice" onClick={()=>setInline(!inline)}>{related.user_facing_name} {inline?'접기':'펼치기'}</button>
        {inline&&<div id="inline-practice" className="inline-practice rise"><GuideAudio audio={audioState(related)}/><ol>{related.steps.map((t,i)=><li key={t}><strong>{relatedTitles?.[i]}</strong>{t}</li>)}</ol></div>}
      </>}
      {p?.kitStep!==undefined&&step.index===0&&accessible.length>0&&<ul className="recall-list">{accessible.map(a=><li key={a.id}>{a.user_facing_name}</li>)}</ul>}
      {p?.kitStep===step.index&&(kitOpen&&accessible.length>0
        ?<Link className="button step-action" href="/my-practice">Practice Kit 열기</Link>
        :<p className="muted">{accessible.length===0?'아직 열린 연습이 없어요. 고를 연습이 생기면 여기서 이어가요.':'마지막 이야기를 마치면 고를 수 있어요.'}</p>)}
    </div>
    <div className="step-nav">
      {!last&&<button type="button" className="button" onClick={()=>go(pos+1)}>다음</button>}
      {pos>0&&<button type="button" className="text-link" onClick={()=>go(pos-1)}>이전</button>}
    </div>
  </div>;
}

export function HomePractice({session,content,accessible,kitOpen,kind,back,eyebrow,memory,audio,record,footer}:Props) {
  const p=content?presentations[content.id]:undefined;
  const [phase,setPhase]=useState<'remember'|'try'>('remember');
  const [value,setValue]=useState(''),[recordOpen,setRecordOpen]=useState(false),[recordMounted,setRecordMounted]=useState(false);
  const todayRef=useRef<HTMLHeadingElement>(null);
  useEffect(()=>{if(phase==='try')todayRef.current?.focus();},[phase]);
  const reminder=content&&'reminder' in content?content.reminder:undefined;
  const choice=p?.control?.kind==='choice'?p.control:undefined;
  const chosen=value.trim();
  const hasGuide=audio?.kind==='guide';
  const title=content?.user_facing_name??session.user_facing_name;
  const leadKeys=recordLeadKeys(p,choice&&chosen?choice.prefillKey:undefined);

  return <article className={`hp is-${phase}`}>
    {back&&<Link className="back-link" href={back.href}>← {back.label}</Link>}
    <header className="hp-scene">
      {p&&<SceneHero scene={p.scene} compact={phase==='try'}/>}
      <p className="eyebrow">{eyebrow??`S${session.order} · ${session.animal}`}</p>
      <h1>{title}</h1>
      {phase==='remember'&&<>
        {kind==='session'&&<p className="bridge">{BRIDGE[0]}<br/>{BRIDGE[1]}</p>}
        <p className="scene-line">{memory??session.memoryCue}</p>
        {content?<div className="actions"><button type="button" className="button" onClick={()=>setPhase('try')}>{kind==='practice'?(hasGuide?'안내와 함께 해보기 ▶':'시작하기'):'오늘 해보기'}</button></div>
          :<p className="muted">이 이야기의 연습을 준비하고 있어요.</p>}
      </>}
    </header>

    {phase==='try'&&content&&<>
      <section className="hp-today rise" aria-labelledby="today-heading">
        <h2 id="today-heading" ref={todayRef} tabIndex={-1}>{kind==='practice'?'해보기':'오늘 해보기'}</h2>
        <GuideAudio audio={audio}/>
        <Steps content={content} p={p} accessible={accessible} kitOpen={kitOpen} value={value} setValue={setValue}/>
        {reminder&&<p className="reminder">{reminder}</p>}
      </section>

      {record?.schema&&p?.record&&<section className="hp-record rise">
        <button type="button" className="record-toggle" aria-expanded={recordOpen} aria-controls="record-panel" onClick={()=>{setRecordOpen(!recordOpen);setRecordMounted(true);}}>
          경험 남기기 <span aria-hidden="true">{recordOpen?'−':'+'}</span>
        </button>
        {recordMounted&&<div id="record-panel" hidden={!recordOpen}>
          <EntryForm inline focusOnMount schema={record.schema} sessionId={record.sessionId} practiceId={record.practiceId} weeklyTaskId={record.weeklyTaskId} practiceName={title}
            primaryKeys={leadKeys} initial={choice&&chosen?{[choice.prefillKey]:chosen}:undefined} backHref={back?.href??'/sessions'}/>
        </div>}
      </section>}
      {footer}
    </>}
  </article>;
}
