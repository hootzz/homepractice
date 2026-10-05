'use client';
import {useState} from 'react';
import {useWorkbook} from './WorkbookProvider';

export function RecordPdfExport() {
  const {store,release}=useWorkbook();
  const [busy,setBusy]=useState(false),[message,setMessage]=useState('');
  async function download() {
    if(!store)return;
    setBusy(true);setMessage('');
    try {
      const {createRecordPdf,recordExportBlocks}=await import('@/lib/recordPdf');
      const now=new Date();
      const names=Object.fromEntries([...release.practices,...release.weeklyTasks].map(p=>[p.id,p.user_facing_name]));
      const pdf=await createRecordPdf(recordExportBlocks(store.entries,store.kit.items,now.toISOString(),[],names));
      const url=URL.createObjectURL(pdf),link=document.createElement('a');
      link.href=url;link.download=`MindForest-records-${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}.pdf`;
      document.body.appendChild(link);link.click();link.remove();
      setTimeout(()=>URL.revokeObjectURL(url),60_000);
      setMessage('PDF를 만들었습니다. 브라우저의 다운로드를 확인해 주세요.');
    } catch {setMessage('PDF를 만들지 못했어요. 기록은 그대로 보관되어 있습니다. 다시 시도해 주세요.');}
    finally {setBusy(false);}
  }
  return <div className="section"><button className="button secondary" disabled={busy} onClick={download}>{busy?'PDF 만드는 중…':'내 기록 PDF로 내보내기'}</button><p className="muted privacy-note">기록은 이 기기에서 PDF로 만들어지며 외부 서버로 전송되지 않습니다. 이미지형 PDF로, 글자 검색과 선택은 지원하지 않습니다.</p>{message&&<p role="status">{message}</p>}</div>;
}
