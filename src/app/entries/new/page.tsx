import {NewEntryView} from '@/components/Entries';
export default async function Page({searchParams}:{searchParams:Promise<{session?:string;practice?:string;task?:string}>}){const query=await searchParams;return <NewEntryView query={query}/>;}
