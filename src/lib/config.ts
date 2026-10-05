import type { Mode, SessionId } from './workbookTypes';
export const HOME_MODE: Mode = process.env.NEXT_PUBLIC_HOME_MODE === 'actual' ? 'actual' : 'demo';
// Explicit preview fixture, never copied into actual completion state.
export const DEMO_COMPLETED_SESSIONS: SessionId[] = ['s1','s2','s3'];
