import type { Practice } from './workbookTypes';

export type AudioState =
  | { kind: 'guide'; source: 'file' | 'youtube'; src: string; language: 'ko' | 'en'; credit: string }
  | { kind: 'text_only' };

/** A confirmed Korean practice mapping alone never produces audio. A guide is played in-app
 *  only when its practice match and usage permission are both confirmed. */
export function audioState(practice: Practice): AudioState {
  const g = practice.audio?.guide;
  if (g && g.practiceMatch === true && g.usageConfirmed === true) return { kind: 'guide', source: g.kind, src: g.src, language: g.language, credit: g.credit };
  return { kind: 'text_only' };
}
