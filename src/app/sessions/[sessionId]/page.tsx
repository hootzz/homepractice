import {SessionView} from '@/components/WorkbookScreens';
export default async function Page({params}:{params:Promise<{sessionId:string}>}){const {sessionId}=await params;return <SessionView id={sessionId}/>;}
