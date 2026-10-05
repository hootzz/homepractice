import type {Entry, PracticePlan} from './types';
import {sessions} from '../content/sessions';
import {sessions as workbookSessions} from '../content/workbook';
import {practices} from '../content/practices';
import {entrySchemas} from '../content/entrySchemas';

export interface ExportBlock { text: string; kind: 'title' | 'heading' | 'label' | 'body' }
export interface ExportKitItem { practiceId: string; cue?: string; situation?: string; personalReason?: string }
const practiceName = (id?: string) => practices.find(p => p.id === id)?.title ?? id ?? '연습 미지정';
// Dates only: a record is about the day, not the second it was saved.
const displayDate = (value: string) => Number.isNaN(Date.parse(value)) ? value : new Date(value).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });

/** Export only authored responses. Unknown legacy fields are retained, never inferred. */
export function recordExportBlocks(entries: Entry[], kit: ExportKitItem[], generatedAt: string, legacyPlans: PracticePlan[] = [], names: Record<string,string> = {}): ExportBlock[] {
  const blocks: ExportBlock[] = [{kind:'title',text:'MindForest · 내 기록'}, {kind:'body',text:`생성일: ${displayDate(generatedAt)}`}];
  const groups = [...workbookSessions.map(s=>({id:s.id,title:`Session ${s.order} · ${s.user_facing_name}`})), {id:undefined,title:'이전 기록 · 회기 미확인'}];
  for (const group of groups) {
    const selected = entries.filter(e => (group.id ? e.sessionId === group.id : !sessions.some(s=>s.id===e.sessionId)) && Object.values(e.responses).some(v=>v.trim())).sort((a,b)=>a.createdAt.localeCompare(b.createdAt));
    if (!selected.length) continue;
    blocks.push({kind:'heading',text:group.title});
    for (const entry of selected) {
      const schema = entrySchemas.find(s=>s.id===entry.schemaId);
      const session = sessions.find(s=>s.id===entry.sessionId);
      const name=entry.practiceNameSnapshot??names[entry.weeklyTaskId??entry.practiceId??'']??(entry.practiceId?practiceName(entry.practiceId):session?.representativeHomePractice.title??'자유 기록');
      blocks.push({kind:'label',text:`날짜: ${displayDate(entry.createdAt)}`}, {kind:'label',text:`연습 / 일상 과제: ${name}`});
      for (const [key,answer] of Object.entries(entry.responses)) {
        if (!answer.trim()) continue;
        blocks.push({kind:'label',text:entry.questionSnapshot?.[key]??schema?.questions.find(q=>q.key===key)?.label ?? key}, {kind:'body',text:answer});
      }
    }
  }
  // Existing prototype plans are retained, not silently approved as the new S8 Kit.
  if (legacyPlans.length) blocks.push({kind:'heading',text:'이전 연습 계획'});
  for (const plan of legacyPlans) {
    blocks.push({kind:'label',text:practiceName(plan.practiceId)});
    if (typeof plan.cue==='string' && plan.cue.trim()) blocks.push({kind:'body',text:`떠올릴 상황: ${plan.cue}`});
    if (typeof plan.reason==='string' && plan.reason.trim()) blocks.push({kind:'body',text:`나의 이유: ${plan.reason}`});
  }
  blocks.push({kind:'heading',text:'개인 Practice Kit'});
  for (const item of kit) {
    blocks.push({kind:'label',text:names[item.practiceId]??practiceName(item.practiceId)});
    if (item.cue?.trim()) blocks.push({kind:'body',text:`떠올릴 때: ${item.cue}`});
    if (item.situation?.trim()) blocks.push({kind:'body',text:`일상 상황: ${item.situation}`});
    if (item.personalReason?.trim()) blocks.push({kind:'body',text:`나의 이유: ${item.personalReason}`});
  }
  if (!kit.length) blocks.push({kind:'body',text:'아직 정리한 Practice Kit가 없습니다.'});
  return blocks;
}

/** Browser-only image PDF: the app font (MaruBuri) or system Korean fonts, no network, no storage mutation.
 * Raster pages preserve Korean appearance but do not provide searchable text.
 */
export async function createRecordPdf(blocks: ExportBlock[]): Promise<Blob> {
  await document.fonts.ready;
  const width=1240, height=1754, margin=100, bottom=height-110;
  const canvas=document.createElement('canvas');
  canvas.width=width; canvas.height=height;
  const ctx=canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas unavailable');
  const images: Uint8Array[]=[];
  let y=margin;
  // Same face as the app (MaruBuri via next/font); system Korean fonts if it is not available.
  const family=(typeof document.body!=='undefined'&&document.body?getComputedStyle(document.body).fontFamily:'')||'"Malgun Gothic", "Apple SD Gothic Neo", sans-serif';
  const font=(size:number,bold=false)=>`${bold?'700':'400'} ${size}px ${family}`;
  function clearPage() { ctx!.fillStyle='#ffffff';ctx!.fillRect(0,0,width,height);y=margin; }
  async function savePage() {
    ctx!.font=font(20);ctx!.fillStyle='#666666';ctx!.fillText(`MindForest · ${images.length+1}`,margin,height-55);
    const blob=await new Promise<Blob>((resolve,reject)=>canvas.toBlob(value=>value?resolve(value):reject(new Error('Page encoding failed')),'image/jpeg',0.95));
    images.push(new Uint8Array(await blob.arrayBuffer()));
  }
  clearPage();
  for (const block of blocks) {
    const size=block.kind==='title'?38:block.kind==='heading'?30:block.kind==='label'?24:25;
    const lineHeight=Math.ceil(size*1.65), bold=block.kind!=='body';
    const gap=block.kind==='heading'?28:14;
    // Reserve a following line for headings/labels when possible.
    if (y+gap+lineHeight*(bold?2:1)>bottom) {await savePage();clearPage();}
    y+=gap;
    ctx.font=font(size,bold);
    const lines:string[]=[];
    for (const paragraph of block.text.replace(/\r\n?/g,'\n').split('\n')) {
      let line='';
      // Code-point wrapping handles Korean and long unbroken strings without clipping.
      for (const char of Array.from(paragraph)) {
        if (line && ctx.measureText(line+char).width>width-2*margin) {lines.push(line);line=char;} else line+=char;
      }
      lines.push(line);
    }
    for (const line of lines) {
      if (y+lineHeight>bottom) {await savePage();clearPage();}
      ctx.font=font(size,bold);ctx.fillStyle='#202b25';ctx.fillText(line,margin,y+size);y+=lineHeight;
    }
  }
  await savePage();
  return encodeImagePdf(images,width,height);
}

/** Minimal PDF 1.4 writer; all dynamic user text is rendered, never interpolated into PDF syntax. */
function encodeImagePdf(images: Uint8Array[],width:number,height:number): Blob {
  const encoder=new TextEncoder(), chunks:Uint8Array<ArrayBuffer>[]=[]; const offsets:number[]=[0];let length=0;
  function append(data:string|Uint8Array) {const bytes=typeof data==='string'?encoder.encode(data):new Uint8Array(data);chunks.push(bytes);length+=bytes.byteLength;}
  function object(id:number,body:string,stream?:Uint8Array) {offsets[id]=length;append(`${id} 0 obj\n${body}`);if(stream){append('\nstream\n');append(stream);append('\nendstream');}append('\nendobj\n');}
  append('%PDF-1.4\n');
  object(1,'<< /Type /Catalog /Pages 2 0 R >>');
  object(2,`<< /Type /Pages /Count ${images.length} /Kids [${images.map((_,i)=>`${3+i*3} 0 R`).join(' ')}] >>`);
  images.forEach((bytes,index)=>{
    const id=3+index*3;
    object(id,`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Im ${id+1} 0 R >> >> /Contents ${id+2} 0 R >>`);
    object(id+1,`<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${bytes.length} >>`,bytes);
    const command=encoder.encode('q\n595.28 0 0 841.89 0 0 cm\n/Im Do\nQ');
    object(id+2,`<< /Length ${command.length} >>`,command);
  });
  const xref=length;
  append(`xref\n0 ${offsets.length}\n0000000000 65535 f \n`);
  for(const offset of offsets.slice(1))append(`${String(offset).padStart(10,'0')} 00000 n \n`);
  append(`trailer\n<< /Size ${offsets.length} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
  return new Blob(chunks,{type:'application/pdf'});
}
