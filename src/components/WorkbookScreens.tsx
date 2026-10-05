'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { sessions, schemas, CONTENT_TODOS } from '@/content/workbook';
import { presentations } from '@/content/presentation';
import { audioState } from '@/lib/audio';
import { canAccessSession, canAccessPractice, canSelectKit, repertoire } from '@/lib/access';
import { useWorkbook } from './WorkbookProvider';
import { HomePractice } from './HomePractice';
import { SceneSketch } from './SceneSketch';
import type { Practice, Session } from '@/lib/workbookTypes';

export function Closed({missing=false}:{missing?:boolean}) {return <section className="empty"><h1>{missing?'안내를 찾을 수 없어요':'이야기를 마친 뒤 이어가요'}</h1><p>{missing?'지금 사용할 수 있는 연습으로 돌아가요.':'게임에서 해당 회기를 마치면 연결된 연습을 펼칠 수 있어요.'}</p><Link className="text-link" href="/sessions">이야기 보기 →</Link></section>;}

const sessionOf=(id:string)=>sessions.find(s=>s.id===id) as Session;
/** Formal practices are listed apart from the daily-life practice, quietly. */
function PracticeRows({items,origin=true}:{items:Practice[];origin?:boolean}) {return <ul className="practice-list">{items.map(p=><li key={p.id}><Link className="practice-row" href={`/practices/${p.id}`}><span>{p.user_facing_name}{origin&&<small className="row-sub">S{sessionOf(p.introducedSessionId).order} · {sessionOf(p.introducedSessionId).animal}에서 열린 연습</small>}</span><span aria-hidden="true">→</span></Link></li>)}</ul>;}

/** Home card: scene thumbnail, "S3 · 사슴", title, one line for today. */
function TodayCard({session,today}:{session:Session;today:string}) {
  const p=presentations[`week_${session.order}`];
  return <Link className="today-card reveal" href={`/sessions/${session.id}`}>
    {p&&<span className="thumb">{p.scene.image?<Image src={p.scene.image.src} width={p.scene.image.width} height={p.scene.image.height} alt="" unoptimized/>:<SceneSketch sketch={p.scene.sketch} alt=""/>}</span>}
    <span className="today-card-text"><span className="eyebrow">S{session.order} · {session.animal}</span><strong>{session.user_facing_name}</strong><span>{today}</span></span>
  </Link>;
}

export function HomeView(){
  const {store,release}=useWorkbook();if(!store)return null;
  const latest=[...sessions].reverse().find(s=>canAccessSession(s.id,store.progress));
  const task=latest&&release.weeklyTasks.find(t=>t.sessionId===latest.id);
  const regular=repertoire(release,store.progress);
  return <><div className="intro"><h1>지금 이어갈 장면</h1></div>
    {latest&&task?<TodayCard session={latest} today={task.short_description}/>:<div className="empty"><p>{latest?'이번 이야기의 연습을 준비하고 있어요.':'이야기를 마치면 여기에서 이어갈 수 있어요.'}</p><Link className="text-link" href="/sessions">이야기 보기 →</Link></div>}
    {regular.length>0&&<section className="section quiet"><h2>다시 해볼 수 있는 연습</h2><PracticeRows items={regular}/></section>}
    {canSelectKit(store.progress)&&latest?.id!=='s8'&&<p className="section"><Link className="text-link" href="/my-practice">나의 Practice Kit →</Link></p>}</>;
}

export function SessionListView(){
  const {store}=useWorkbook();if(!store)return null;
  return <><div className="intro"><h1>이야기</h1><p>지나온 장면에서 다시 시작해요.</p></div>
    <ol className="session-list">{sessions.map(s=>{const open=canAccessSession(s.id,store.progress);return <li key={s.id}><Link href={`/sessions/${s.id}`} className={`session-row ${open?'':'locked'}`}>
      <span className="session-number">S{s.order}</span><span className="row-text">{s.user_facing_name}<small>{s.animal}</small></span><span className="status">{open?'열림':'이후 이야기'}</span></Link></li>;})}</ol></>;
}

export function SessionView({id}:{id:string}) {
  const {store,release}=useWorkbook();if(!store)return null;const session=sessions.find(s=>s.id===id);if(!session)return <Closed missing/>;
  if(!canAccessSession(session.id,store.progress))return <Closed/>;
  const task=release.weeklyTasks.find(t=>t.sessionId===session.id);
  const regular=repertoire(release,store.progress);
  const opened=regular.filter(p=>p.introducedSessionId===session.id);
  const footer=opened.length>0?<section className="hp-more quiet"><h2>다시 해볼 수 있는 연습</h2><PracticeRows items={opened} origin={false}/></section>:undefined;
  return <HomePractice key={session.id} kind="session" session={session} content={task} accessible={regular} kitOpen={canSelectKit(store.progress)}
    record={task&&{schema:schemas.find(s=>s.id===task.recordSchemaId),sessionId:session.id,weeklyTaskId:task.id}} footer={footer}/>;
}

export function PracticeView({id}:{id:string}) {
  const {store,release}=useWorkbook();if(!store)return null;
  const p=release.practices.find(p=>p.id===id);if(!p)return <Closed missing/>;if(!canAccessPractice(p,store.progress))return <Closed/>;
  const session=sessionOf(p.introducedSessionId);
  return <HomePractice key={p.id} kind="practice" session={session} content={p} accessible={repertoire(release,store.progress)} kitOpen={canSelectKit(store.progress)}
    back={{href:`/sessions/${session.id}`,label:`S${session.order} ${session.user_facing_name}`}} eyebrow="다시 해볼 수 있는 연습"
    memory={p.context} audio={audioState(p)}
    record={{schema:schemas.find(s=>s.id===p.recordSchemaId),sessionId:p.introducedSessionId,practiceId:p.id}}/>;
}

export function DemoView(){const {store,completeDemo}=useWorkbook();const [error,setError]=useState('');if(!store)return null;if(store.mode!=='demo')return <Closed missing/>;return <><div className="intro"><h1>데모 회기 설정</h1><p>실제 게임 진행과 별개인 예시 상태입니다. 선택한 회기만 추가하며 이전 연습과 기록은 유지됩니다.</p></div>{sessions.map(s=><div className="practice-row" key={s.id}><span>S{s.order} · {s.user_facing_name}</span>{store.progress.completedSessionIds.includes(s.id)?<span>열려 있음</span>:<button className="button secondary" onClick={()=>{try{completeDemo(s.id);setError('');}catch{setError('저장하지 못했어요. 다시 시도해 주세요.');}}}>회기 완료 예시 적용</button>}</div>)}{error&&<p role="alert" className="error">{error}</p>}<details className="section"><summary>콘텐츠 확인 사항</summary><ul>{CONTENT_TODOS.map(t=><li key={t}>{t}</li>)}</ul></details><Link className="text-link" href="/">홈으로 돌아가기</Link></>;}
