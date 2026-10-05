'use client';
import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import Link from 'next/link';
import { HOME_MODE } from '@/lib/config';
import { getRelease } from '@/content/workbook';
import { loadWorkbook, commitWorkbook, addCompletion } from '@/lib/workbookStorage';
import { gameCompletionAdapter } from '@/lib/gameAdapter';
import type { WorkbookStore, ContentRelease, SessionId } from '@/lib/workbookTypes';
const release=getRelease(HOME_MODE);
interface State {
  store:WorkbookStore|null; release:ContentRelease; error:string;
  change:(update:(store:WorkbookStore)=>WorkbookStore)=>void;
  completeDemo:(id:SessionId)=>void; reload:()=>void;
}
const Context=createContext<State|null>(null);
export function useWorkbook(){const value=useContext(Context);if(!value)throw new Error('Missing workbook provider');return value;}
export function WorkbookProvider({children}:{children:ReactNode}) {
  const [store,setStore]=useState<WorkbookStore|null>(null),[error,setError]=useState('');
  const reload=useCallback(()=>{try{setStore(loadWorkbook(HOME_MODE,release,window.localStorage));setError('');}catch(e){setError(e instanceof Error?e.message:'기기 저장소를 읽지 못했어요.');}},[]);
  const change=useCallback((update:(s:WorkbookStore)=>WorkbookStore)=>{
    // Callers show their own error next to the input they keep on screen.
    const next=commitWorkbook(HOME_MODE,release,window.localStorage,update);setStore(next);
  },[]);
  useEffect(()=>{const timer=setTimeout(reload,0);const sync=(e:StorageEvent)=>{if(e.key===`mindforest.home.v3.${HOME_MODE}`)reload();};window.addEventListener('storage',sync);return()=>{clearTimeout(timer);window.removeEventListener('storage',sync);};},[reload]);
  useEffect(()=>{if(HOME_MODE!=='actual')return;return gameCompletionAdapter.subscribe(id=>{try{change(s=>addCompletion(s,id,'game'));}catch{setError('게임 진행을 이 기기에 저장하지 못했어요. 기존 기록은 그대로 있어요.');}});},[change]);
  return <Context.Provider value={{store,release,error,change,reload,completeDemo:id=>change(s=>addCompletion(s,id,'demo'))}}>
    {HOME_MODE==='demo'?<aside className="mode-notice"><p>데모 · 실제 진행과 별개예요</p><small>검토용 예시 콘텐츠로 둘러보는 화면이에요.</small><Link className="text-link" href="/demo">데모 회기 설정</Link></aside>:<aside className="mode-notice"><p>게임 진행 연결을 준비하고 있어요.</p><small>기존 기록은 이 기기에서 계속 볼 수 있어요.</small></aside>}
    {error&&<div role="alert" className="error"><p>{error}</p><button className="text-link" onClick={reload}>다시 읽기</button></div>}
    {store?.legacy.unreadableCount ? <p className="notice">이전 자료 중 읽지 못한 항목이 있어요. 원문은 기존 저장소와 백업에 보관되어 있습니다.</p>:null}
    {store?children:!error?<p role="status" className="section">워크북을 펼치는 중이에요.</p>:<p className="muted">자료를 덮어쓰거나 초기화하지 않았습니다. 저장 공간과 브라우저 설정을 확인한 뒤 다시 읽어주세요.</p>}
  </Context.Provider>;
}
