import {PracticeView} from '@/components/WorkbookScreens';
export default async function Page({params}:{params:Promise<{practiceId:string}>}){const {practiceId}=await params;return <PracticeView id={practiceId}/>;}
