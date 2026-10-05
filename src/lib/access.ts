import type { ContentRelease, Progress, SessionId, Practice, WeeklyTask } from './workbookTypes';
export const canAccessSession = (id: SessionId, progress: Progress) => progress.completedSessionIds.includes(id);
export const canAccessPractice = (practice: Practice, progress: Progress) => canAccessSession(practice.introducedSessionId, progress);
export const canAccessTask = (task: WeeklyTask, progress: Progress) => canAccessSession(task.sessionId, progress);
export const canSelectKit = (progress: Progress) => canAccessSession('s8', progress);
export const repertoire = (release: ContentRelease, progress: Progress) => release.practices.filter(p=>canAccessPractice(p,progress));
export function resolveContext(release: ContentRelease, progress: Progress, context: {practiceId?: string; weeklyTaskId?: string}) {
  if (Boolean(context.practiceId) === Boolean(context.weeklyTaskId)) return undefined;
  if (context.practiceId) return release.practices.find(p=>p.id===context.practiceId && canAccessPractice(p,progress));
  return release.weeklyTasks.find(t=>t.id===context.weeklyTaskId && canAccessTask(t,progress));
}
export function validateRelease(release: ContentRelease) {
  const unique=(ids:string[])=>new Set(ids).size===ids.length;
  if (!unique(release.bundles.map(b=>b.sessionId)) || !unique(release.practices.map(p=>p.id)) || !unique(release.weeklyTasks.map(t=>t.id))) throw new Error('Duplicate content ID');
  for (const p of release.practices) {
    const owners=release.bundles.filter(b=>b.regularPracticeIds.includes(p.id));
    if (owners.length!==1 || owners[0].sessionId!==p.introducedSessionId || p.introducedSessionId==='s8') throw new Error('Invalid introduction bundle');
  }
  for (const b of release.bundles) {
    if (!unique(b.regularPracticeIds) || b.regularPracticeIds.some(id=>!release.practices.some(p=>p.id===id))) throw new Error('Unknown practice');
    if (b.sessionSpecificTaskId && !release.weeklyTasks.some(t=>t.id===b.sessionSpecificTaskId && t.sessionId===b.sessionId)) throw new Error('Invalid task bundle');
  }
  for (const t of release.weeklyTasks) if (!release.bundles.some(b=>b.sessionSpecificTaskId===t.id && b.sessionId===t.sessionId)) throw new Error('Unbundled task');
}
