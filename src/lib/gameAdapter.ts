import { SESSION_IDS, type SessionId, type Mode, type Progress } from './workbookTypes';
export const BLOCKED_GAME_COMPLETION_SYNC = 'BLOCKED_GAME_COMPLETION_SYNC';
export const BLOCKED_GAME_KIT_SYNC = 'BLOCKED_GAME_KIT_SYNC';
// A future trusted bridge supplies session-complete events. No backend, query
// parameter or action-level participant gate is invented here.
export interface GameCompletionAdapter {
  status: 'connected' | typeof BLOCKED_GAME_COMPLETION_SYNC;
  subscribe(onCompleted: (sessionId: SessionId) => void): () => void;
}
export const gameCompletionAdapter: GameCompletionAdapter = {
  status: BLOCKED_GAME_COMPLETION_SYNC, subscribe: () => () => {},
};
export function completeSession(progress: Progress, sessionId: SessionId): Progress {
  if (!SESSION_IDS.includes(sessionId)) throw new Error('Unknown session');
  return { completedSessionIds: SESSION_IDS.filter(id=>id===sessionId || progress.completedSessionIds.includes(id)) };
}
export function demoCompletion(mode: Mode, progress: Progress, sessionId: SessionId) {
  if (mode !== 'demo') throw new Error('Demo completion cannot change actual progress');
  return completeSession(progress,sessionId);
}
