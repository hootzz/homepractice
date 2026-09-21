import {notFound} from 'next/navigation';
import {sessions} from '@/content/sessions';
import {practices} from '@/content/practices';
import {entrySchemas} from '@/content/entrySchemas';
import {canAccessSession,canAccessPractice} from '@/lib/access';
import {EntryForm} from '@/components/EntryForm';
export default async function NewEntry({searchParams}:{searchParams:Promise<{session?:string;practice?:string}>}){const query=await searchParams;const session=sessions.find(s=>s.id===query.session);const practice=practices.find(p=>p.id===query.practice);if(query.session&&(!session||!canAccessSession(session.order)))notFound();if(query.practice&&(!practice||!canAccessPractice(practice.introducedAtSession)))notFound();const schema=entrySchemas.find(s=>s.id===(session?.entrySchemaId??'free'));if(!schema)notFound();return <EntryForm schema={schema} sessionId={session?.id} practiceId={practice?.id}/>;}
