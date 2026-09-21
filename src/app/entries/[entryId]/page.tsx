import {EntryDetail} from '@/components/Entries';
export default async function EntryPage({params}:{params:Promise<{entryId:string}>}){const {entryId}=await params;return <EntryDetail id={entryId}/>;}
