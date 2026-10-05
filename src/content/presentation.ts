// Presentation layer for the Home Practice page (document/HOME_PRACTICE_REDESIGN.md §4a–§4c).
// One page, progressively disclosed: REMEMBER (scene) → TRY (a few short steps, one at a
// time) → REFLECT (optional trace). The practice itself happens in real life. A choice is
// transient page state and only pre-fills the record if the person opens it. Access is
// resolved from the release + Progress first and is never affected by anything here.
import type { Practice, WeeklyTask } from '../lib/workbookTypes';

/** Shown once, on each session page, between the game scene and today's practice. */
export const BRIDGE = ['숲에서 해본 걸,', '오늘 한 번 더.'] as const;

export type SketchKey =
  | 'walnut' | 'berries' | 'waiting' | 'footpath' | 'flow'
  | 'rain_hand' | 'three_fields' | 'activity_cards' | 'gathered' | 'breath_three';

export type Control =
  /** Pick a real-life context. `own` adds a free-text option. */
  | { kind: 'choice'; label: string; options: string[]; own?: boolean; prefillKey: string; /** Tag shown on later steps, e.g. 고른 물건 · 컵. */ recall?: string }
  /** Three named parts side by side (S6). Not a form. */
  | { kind: 'fields'; cells: string[] };

export interface HomePresentation {
  scene: {
    sketch: SketchKey;
    /** Approved local capture under /public. Optional: falls back to the sketch. */
    image?: { src: string; width: number; height: number; /** CSS object-position used when the scene compacts. */ focus?: string };
    alt: string;
  };
  /** 1:1 with content.steps. */
  stepTitles: string[];
  /** One light control, shown on the step where it belongs. */
  control?: Control & { atStep: number };
  /** S4: show the four-part flow above every step, current part highlighted. */
  flow?: boolean;
  /** Step shown only when this Regular practice is already accessible (never unlocks). */
  practiceStep?: { index: number; practiceId: string };
  /** Step that carries the "Practice Kit 열기" action (S8). */
  kitStep?: number;
  /** Record: `lead` is shown when the record opens; other schema keys sit behind "더 남기기".
   *  Omit to show no record (S8: the Kit fields are the personal record). */
  record?: { lead: string[] };
}

export const presentations: Record<string, HomePresentation> = {
  week_1: {
    scene: { sketch: 'walnut', image: { src: '/scenes/s1.jpg', width: 1181, height: 664 }, alt: '탁자 위 호두 더미와 그 뒤의 다람쥐' },
    stepTitles: ['물건 고르기', '바로 쓰기 전에', '처음 보는 것처럼', '그대로 이어가기'],
    control: { kind: 'choice', label: '오늘 고를 물건', options: ['컵', '이어폰', '문손잡이', '펜', '간식'], own: true, prefillKey: 'object', recall: '고른 물건', atStep: 0 },
    record: { lead: ['overlooked'] },
  },
  week_2: {
    scene: { sketch: 'waiting', image: { src: '/scenes/s2.jpg', width: 730, height: 411 }, alt: '오두막에서 거북이를 기다리는 장면. 생각풍선: 거북이를 기다리는 동안, 이 오두막을 천천히 둘러볼래? 서두르지 않아도 돼.' },
    stepTitles: ['기다리는 순간', '몸에서 한 곳', '함께 있는 생각', '함께 있는 기분'],
    control: { kind: 'choice', label: '오늘의 기다림', options: ['엘리베이터', '버스', '로딩', '약속', '줄'], own: true, prefillKey: 'situation', recall: '고른 기다림', atStep: 0 },
    record: { lead: ['first_body'] },
  },
  week_3: {
    scene: { sketch: 'footpath', image: { src: '/scenes/s3.jpg', width: 1200, height: 675 }, alt: '꽃이 핀 흙길에 선 사슴과 주인공' },
    stepTitles: ['걸을 길', '발이 닿는 느낌', '마음이 간 곳', '다시 발바닥으로'],
    control: { kind: 'choice', label: '오늘 걸을 길', options: ['학교 가는 길', '집 가는 길', '산책'], own: true, prefillKey: 'path', recall: '고른 길', atStep: 0 },
    record: { lead: ['went_returned'] },
  },
  week_4: {
    scene: { sketch: 'berries', alt: '가지에 달린 열매를 그린 그림' },
    stepTitles: ['무슨 일', '몸과 마음', '하고 싶었던 것', '실제로 한 것'],
    flow: true,
    // The flow itself is the optional trace: its four parts open together, nothing more.
    record: { lead: ['event', 'state', 'urge', 'action'] },
  },
  week_5: {
    scene: { sketch: 'rain_hand', image: { src: '/scenes/s5.jpg', width: 1200, height: 675 }, alt: '젖은 숲길 돌 위의 개구리와 그 위의 비구름' },
    stepTitles: ['돌아올 감각', '가벼운 불편함', '바로 바꾸기 전에', '돌아오거나 멈추기'],
    control: { kind: 'choice', label: '돌아올 감각', options: ['발바닥', '손', '호흡'], prefillKey: 'anchor', recall: '정해둔 감각', atStep: 0 },
    record: { lead: ['noticed'] },
  },
  week_6: {
    scene: { sketch: 'three_fields', image: { src: '/scenes/s6.jpg', width: 1200, height: 675, focus: 'center 12%' }, alt: '노을 진 언덕 위에 떠 있는 생각구름. 마음이 좀 답답한 것 같아' },
    stepTitles: ['한 순간 고르기', '세 칸으로 나누기', '생각구름 바라보기', '숨 고르기', '지금 도움이 될 것'],
    control: { kind: 'fields', cells: ['있었던 일', '그때의 상태', '떠오른 생각'], atStep: 1 },
    practiceStep: { index: 3, practiceId: 'breathing_space' },
    record: { lead: ['helpful'] },
  },
  week_7: {
    scene: { sketch: 'activity_cards', alt: '겹쳐 놓인 활동 카드를 그린 그림' },
    stepTitles: ['오늘의 활동', '나에게 남은 느낌', '작은 돌봄'],
    control: { kind: 'choice', label: '나에게 준 영향', options: ['채워줌', '지치게 함', '상황에 따라 다름', '잘 모르겠음'], prefillKey: 'effect', atStep: 1 },
    record: { lead: ['care'] },
  },
  week_8: {
    scene: { sketch: 'gathered', image: { src: '/scenes/s8.jpg', width: 1200, height: 675, focus: 'center 35%' }, alt: '밤의 꽃밭과 꿀단지, 그 위를 나는 꿀벌' },
    stepTitles: ['다시 만나기', '가져가고 싶은 것', '직접 고르기'],
    kitStep: 2,
  },
  walking_return: {
    scene: { sketch: 'footpath', image: { src: '/scenes/s3.jpg', width: 1200, height: 675 }, alt: '꽃이 핀 흙길에 선 사슴과 주인공' },
    stepTitles: ['걸음 느끼기', '발과 다리', '다시 발로'],
    record: { lead: ['went_returned'] },
  },
  breathing_space: {
    scene: { sketch: 'breath_three', alt: '넓게 살피고, 모으고, 다시 넓히는 모래시계 모양 그림' },
    stepTitles: ['지금 살피기', '호흡에 모으기', '몸과 주변으로 넓히기'],
    record: { lead: ['noticed_after'] },
  },
};

export interface GuidedStep { index: number; title: string; text: string }

/** Steps actually shown. A practice step appears only when that practice is already
 *  accessible; this never unlocks anything. */
export function guidedSteps(content: Practice | WeeklyTask, accessiblePracticeIds: string[]): GuidedStep[] {
  const p = presentations[content.id];
  return content.steps
    .map((text, index) => ({ index, text, title: p?.stepTitles[index] ?? '' }))
    .filter(s => !(p?.practiceStep && s.index === p.practiceStep.index && !accessiblePracticeIds.includes(p.practiceStep.practiceId)));
}

/** Keys shown when the record opens: the lead question, plus a context field only when a
 *  choice pre-filled it (so nothing pre-filled is ever saved out of sight). */
export function recordLeadKeys(p: HomePresentation | undefined, prefilledKey?: string): string[] {
  if (!p?.record) return [];
  return prefilledKey && !p.record.lead.includes(prefilledKey) ? [prefilledKey, ...p.record.lead] : [...p.record.lead];
}
