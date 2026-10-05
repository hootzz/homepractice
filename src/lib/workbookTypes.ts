import type { Entry } from './types';
export const SESSION_IDS = ['s1','s2','s3','s4','s5','s6','s7','s8'] as const;
export type SessionId = typeof SESSION_IDS[number];
export type Mode = 'actual' | 'demo';
export interface Progress { completedSessionIds: SessionId[] }
export interface Copy { internal_name: string; user_facing_name: string; short_description: string }
export type Guidance = { status: 'unspecified' } | { status: 'sourced'; value: string; source: string };
/** A. Korean canonical practice name/structure confirmed in the Korean book. Says nothing about audio. */
export interface MbctMapping { canonicalName: string; book: string; pages: string }
/** Audio is tracked separately from the practice mapping. It plays inside the app
 *  (no navigation away) and is shown only when the recording matches the practice AND its
 *  use in this app is confirmed. Candidate sources are listed in KOREAN_MBCT_AUDIO_MAPPING.md. */
export interface PracticeAudio {
  guide?: {
    kind: 'file' | 'youtube';
    /** Local /audio/*.mp3 path, or a YouTube video id for an embed. */
    src: string;
    language: 'ko' | 'en';
    credit: string;
    practiceMatch: true;
    usageConfirmed: true;
  };
}
export interface Practice extends Copy {
  id: string; introducedSessionId: SessionId; steps: string[]; recordSchemaId: string;
  /** Confirmed Korean MBCT practice mapping (document/KOREAN_MBCT_AUDIO_MAPPING.md). */
  mbct?: MbctMapping;
  context: string; reminder: string; gameDuration: Guidance; homeDuration: Guidance; frequency: Guidance; audioRequirement: Guidance;
  audio?: PracticeAudio;
}
export interface WeeklyTask extends Copy {
  id: string; sessionId: SessionId; steps: string[]; recordSchemaId: string;
  reminder?: string; relatedPracticeIds: string[];
}
export interface Session extends Copy { id: SessionId; order: number; animal: string; memoryCue: string; artKey: string }
export interface SessionPracticeBundle { sessionId: SessionId; regularPracticeIds: string[]; sessionSpecificTaskId?: string }
export interface ContentRelease { id: string; mode: Mode; bundles: SessionPracticeBundle[]; practices: Practice[]; weeklyTasks: WeeklyTask[] }
export interface KitItem { practiceId: string; cue?: string; situation?: string; personalReason?: string }
export interface PracticeKit { items: KitItem[] }
export interface WorkbookStore {
  schemaVersion: 3; mode: Mode; contentReleaseId: string; progress: Progress;
  entries: Entry[]; kit: PracticeKit;
  legacy: { rawSnapshots: Record<string,string>; plans: unknown[]; unreadableCount: number };
}
