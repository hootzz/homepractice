import Link from 'next/link';
import {AudioGuide} from '@/components/AudioGuide';
import {notFound} from 'next/navigation';
import {practices} from '@/content/practices';
import {canAccessPractice} from '@/lib/access';
export default async function PracticeDetail({params}:{params:Promise<{practiceId:string}>}){const {practiceId}=await params;const practice=practices.find(p=>p.id===practiceId);if(!practice||!canAccessPractice(practice.introducedAtSession))notFound();return <><Link className="text-link" href={`/sessions/s${practice.introducedAtSession}`}>← 회기로 돌아가기</Link><section className="section"><p className="eyebrow">일상에서 해보기{practice.durationLabel?` · ${practice.durationLabel}`:''}</p><h1>{practice.title}</h1><p>{practice.summary}</p><ol className="steps">{practice.steps?.map((step,i)=><li key={i}>{step}</li>)}</ol>{practice.audioUrl&&<AudioGuide url={practice.audioUrl} source={practice.audioSource}/> }<p className="reminder">{practice.reminder??'가능한 만큼 살펴보세요. 기록은 원할 때 남길 수 있습니다.'}</p><Link className="button secondary" href={`/sessions/s${practice.introducedAtSession}`}>닫기</Link></section></>;}
