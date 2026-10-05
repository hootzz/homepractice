'use client';
import {useState} from 'react';
import Link from 'next/link';
import {useWorkbook} from './WorkbookProvider';
import {repertoire,canSelectKit} from '@/lib/access';
import {saveKit,removeKit} from '@/lib/workbookStorage';
import {sessions} from '@/content/workbook';
import type {KitItem,Practice} from '@/lib/workbookTypes';

const FIELDS=[['cue','언제?'],['situation','어떤 상황에서?'],['personalReason','나에게 중요한 이유']] as const;

function KitEditor({item,practice,onClose}:{item:KitItem;practice:Practice;onClose:(saved:boolean)=>void}){
  const {change,release}=useWorkbook();const [draft,setDraft]=useState(item),[error,setError]=useState('');
  return <form className="kit-editor reveal" onSubmit={e=>{e.preventDefault();try{change(s=>saveKit(s,release,draft));onClose(true);}catch{setError('저장하지 못했어요. 적은 내용은 그대로 남아 있어요.');}}}>
    <p className="muted small-note">원하는 칸만 적어요.</p>
    {FIELDS.map(([key,label])=><div className="field" key={key}><label htmlFor={`kit-${practice.id}-${key}`}>{label} <small>(선택)</small></label><input id={`kit-${practice.id}-${key}`} value={draft[key]??''} onChange={e=>setDraft({...draft,[key]:e.target.value})}/></div>)}
    {error&&<p role="alert" className="error">{error}</p>}<div className="actions"><button className="button" type="submit">저장</button><button className="text-link" type="button" onClick={()=>onClose(false)}>취소</button></div>
  </form>;
}

export function MyPracticeView(){
  const {store,release,change}=useWorkbook();const [editing,setEditing]=useState<string|null>(null),[error,setError]=useState(''),[notice,setNotice]=useState('');if(!store)return null;
  const regular=repertoire(release,store.progress),canChoose=canSelectKit(store.progress);
  function take(id:string){try{change(s=>saveKit(s,release,{practiceId:id}));setError('');setNotice('');setEditing(id);}catch{setError('저장하지 못했어요. 다시 시도해 주세요.');}}
  function remove(id:string){try{change(s=>removeKit(s,id));setEditing(null);setError('');setNotice('Kit에서 뺐어요. 연습은 계속 볼 수 있어요.');}catch{setError('변경하지 못했어요. 다시 시도해 주세요.');}}
  return <>
    <div className="intro">{canChoose?<><p className="eyebrow">S8 · 꿀벌</p><h1>나의 Practice Kit</h1><p>해본 연습 중 일상에 가져갈 것을 직접 골라요. 몇 개를 고르든 괜찮아요.</p></>
      :<><p className="eyebrow">나의 연습</p><h1>지금까지 배운 연습</h1><p>이야기에서 열린 연습을 언제든 다시 할 수 있어요.</p></>}</div>
    {error&&<p className="error" role="alert">{error}</p>}{notice&&<p role="status" className="muted">{notice}</p>}
    {regular.length===0?<div className="empty"><p>아직 열린 연습이 없어요.</p><p>이야기를 마치면 해본 연습이 여기에 담겨요.</p><Link className="text-link" href="/sessions">이야기 보기 →</Link></div>
      :<ul className="kit-list">{regular.map(p=>{const item=store.kit.items.find(i=>i.practiceId===p.id);const s=sessions.find(s=>s.id===p.introducedSessionId);
        return <li key={p.id} className={`kit-row${item?' taken':''}`}>
          <div className="kit-head"><Link className="kit-name" href={`/practices/${p.id}`}><small>S{s?.order} · {s?.animal}</small>{p.user_facing_name}</Link>
            {canChoose&&(item?<span className="taken-mark">✓ 가져가요</span>:<button className="button secondary" onClick={()=>take(p.id)}>가져가기</button>)}</div>
          <p className="muted">{p.short_description}</p>
          {item&&editing!==p.id&&<>{FIELDS.some(([k])=>item[k])&&<dl className="kit-fields">{FIELDS.filter(([k])=>item[k]).map(([k,label])=><div key={k}><dt>{label}</dt><dd>{item[k]}</dd></div>)}</dl>}
            <div className="actions"><button className="text-link" onClick={()=>setEditing(p.id)}>{FIELDS.some(([k])=>item[k])?'고치기':'언제·어디서·왜 적기'}</button><button className="text-link" onClick={()=>remove(p.id)}>Kit에서 빼기</button></div></>}
          {item&&editing===p.id&&<KitEditor item={item} practice={p} onClose={saved=>{setEditing(null);if(saved)setNotice('저장했어요.');}}/>}
        </li>;})}</ul>}
    {canChoose?<p className="muted small-note">이 기기에만 저장돼요. 게임 안의 Kit와는 아직 연결되지 않아요.</p>
      :regular.length>0&&<p className="muted small-note">마지막 이야기를 마치면 이 중에서 가져갈 연습을 직접 고를 수 있어요.</p>}
  </>;
}
