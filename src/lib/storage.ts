import type { Entry, PracticePlan } from './types';
const entryKey = 'mindforest.entries.v1';
const planKey = 'mindforest.practicePlans.v1';
function read<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  try { const value: unknown = JSON.parse(localStorage.getItem(key) ?? '[]'); return Array.isArray(value) ? value as T[] : []; }
  catch { return []; }
}
function write<T>(key: string, records: T[]) { localStorage.setItem(key, JSON.stringify(records)); }
export const listEntries = () => read<Entry>(entryKey).filter(x => x && typeof x.id === 'string' && typeof x.createdAt === 'string' && typeof x.schemaId === 'string' && x.responses && typeof x.responses === 'object' && Object.values(x.responses).every(v=>typeof v==='string')).sort((a,b)=>b.createdAt.localeCompare(a.createdAt));
export const getEntry = (id: string) => listEntries().find(x=>x.id===id);
export function createEntry(input: Omit<Entry,'id'|'createdAt'|'updatedAt'>) { const now = new Date().toISOString(); const entry = {...input,id:crypto.randomUUID(),createdAt:now,updatedAt:now}; write(entryKey,[entry,...listEntries()]); return entry; }
export function updateEntry(id: string, responses: Record<string,string>) { write(entryKey,listEntries().map(x=>x.id===id?{...x,responses,updatedAt:new Date().toISOString()}:x)); }
export function deleteEntry(id: string) { write(entryKey,listEntries().filter(x=>x.id!==id)); }
export const listPracticePlans = () => read<PracticePlan>(planKey).filter(x=>x && typeof x.id === 'string' && typeof x.practiceId === 'string');
export function createPracticePlan(input: Pick<PracticePlan,'practiceId'|'cue'|'reason'>) { const now = new Date().toISOString(); const plan = {...input,id:crypto.randomUUID(),createdAt:now,updatedAt:now}; write(planKey,[...listPracticePlans(),plan]); return plan; }
export function updatePracticePlan(id: string, input: Pick<PracticePlan,'practiceId'|'cue'|'reason'>) { write(planKey,listPracticePlans().map(x=>x.id===id?{...x,...input,updatedAt:new Date().toISOString()}:x)); }
export function deletePracticePlan(id: string) { write(planKey,listPracticePlans().filter(x=>x.id!==id)); }
