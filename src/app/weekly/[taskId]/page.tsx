import { notFound, redirect } from 'next/navigation';
import { previewTasks } from '@/content/workbook';
// The weekly task now lives on its session page (scene → today → record). Keep old links
// working; access is still checked on the session page from the stored Progress.
export default async function Page({params}:{params:Promise<{taskId:string}>}){const {taskId}=await params;const task=previewTasks.find(t=>t.id===taskId);if(!task)notFound();redirect(`/sessions/${task.sessionId}`);}
