export type ContentProvenance = "mbct_l" | "mindforest_translation" | "local_copy";
export type SessionStatus = "available" | "current" | "upcoming";
export interface HomePracticeContent {
  id: string;
  title: string;
  summary: string;
  steps: string[];
  reminder?: string;
}
export interface Session {
  id: string;
  order: number;
  title: string;
  npc: string;
  memoryCue: string;
  representativeHomePractice: HomePracticeContent;
  entrySchemaId?: string;
  artKey: string;
  provenance?: ContentProvenance[];
}
export type PracticeType = "formal" | "everyday";
export interface Practice {
  id: string;
  title: string;
  type: PracticeType;
  summary: string;
  durationLabel?: string;
  steps?: string[];
  audioUrl?: string;
  audioSource?: { url: string; teacher: string; language: string; provider: string };
  introducedAtSession: number;
  reminder?: string;
  provenance?: ContentProvenance[];
}
export type SessionPracticeRole = "introduced" | "recommended" | "continued" | "selectable";
export interface SessionPractice { sessionId: string; practiceId: string; role: SessionPracticeRole }
export interface Entry {
  id: string;
  sessionId?: string;
  practiceId?: string;
  schemaId: string;
  responses: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}
export interface PracticePlan {
  id: string;
  practiceId: string;
  cue: string;
  reason?: string;
  createdAt: string;
  updatedAt: string;
}
export interface EntryQuestion { key: string; label: string; placeholder?: string; multiline?: boolean }
export interface EntrySchema { id: string; title: string; intro?: string; questions: EntryQuestion[] }
