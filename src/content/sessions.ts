import type { Session, SessionPractice } from "@/lib/types";

export const sessions: Session[] = [
  {
    id: "s1", order: 1, title: "알아차림과 자동조종", npc: "다람쥐", artKey: "session-01",
    memoryCue: "게임에서는 바로 지나치거나 먹어버릴 수 있는 호두 앞에서 잠시 멈췄습니다. 익숙한 것도 천천히 보면 표면, 모양, 색, 손의 감각처럼 이전에는 지나쳤던 것이 보일 수 있습니다.",
    representativeHomePractice: { id: "s1_home", title: "자동으로 하던 행동 앞에서 잠시 멈춰보기", summary: "물 마시기나 손 씻기처럼 오늘 반복하는 일 하나를 골라봅니다.", steps: ["행동을 시작하기 전 잠시 멈춰봅니다.", "보이는 것, 닿는 감각, 소리, 몸의 움직임 중 한두 가지를 천천히 알아차립니다."] },
    entrySchemaId: "reflection", provenance: ["mindforest_translation"],
  },
  {
    id: "s2", order: 2, title: "몸을 마음에 두기", npc: "거북이", artKey: "session-02",
    memoryCue: "거북이를 기다리는 같은 상황에서도 생각만 있는 것이 아니라 감정과 몸의 반응이 함께 있었습니다. 무엇을 느끼는지 판단하기보다 몸에서 먼저 확인해볼 수 있습니다.",
    representativeHomePractice: { id: "s2_home", title: "하나의 경험을 몸에서 찾아보기", summary: "하루 중 기억에 남는 순간 하나를 골라봅니다.", steps: ["무슨 일이 있었는지 떠올립니다.", "몸 어디에서 가장 분명한 감각이 있었는지 살펴봅니다.", "그때의 감정이나 기분을 살펴봅니다.", "어떤 생각이 함께 있었는지 알아차립니다."] },
    entrySchemaId: "experience", provenance: ["mindforest_translation"],
  },
  {
    id: "s3", order: 3, title: "분산된 마음 모으기", npc: "사슴", artKey: "session-03",
    memoryCue: "숲길에서는 소리와 빛, 생각에 주의가 계속 흩어졌습니다. 목표는 주의가 절대 흩어지지 않게 하는 것이 아니라, 흩어진 것을 알아차리고 발의 감각으로 돌아오는 것이었습니다.",
    representativeHomePractice: { id: "s3_home", title: "짧은 길 하나를 걸으며 돌아오기", summary: "집, 학교, 연구실 주변에서 1–5분 정도의 짧고 익숙한 길 하나를 골라봅니다.", steps: ["발이 바닥에 닿는 감각을 느껴봅니다.", "다른 생각이나 자극으로 주의가 옮겨간 것을 알아차립니다.", "잘못했다고 평가하지 않고 다시 발의 접촉감이나 걸음으로 돌아옵니다."] },
    entrySchemaId: "attention_return", provenance: ["mindforest_translation"],
  },
  {
    id: "s4", order: 4, title: "혐오를 알아차리기", npc: "곰", artKey: "session-04",
    memoryCue: "안개 속에서는 답답함을 빨리 없애고 싶거나 눈앞의 불편함에서 벗어나고 싶은 반응이 쉽게 나타납니다. 중요한 것은 불편함을 좋아하는 것이 아니라, 반응이 시작되는 순간을 조금 더 일찍 알아차리는 것입니다.",
    representativeHomePractice: { id: "s4_home", title: "반응이 시작되는 순간 포착하기", summary: "일상에서 가벼운 불편함이나 짜증이 생긴 순간 하나를 떠올려봅니다.", steps: ["무엇이 불편함을 촉발했는지 살펴봅니다.", "몸에서 먼저 나타난 감각을 알아차립니다.", "뒤따른 생각이나 감정을 살펴봅니다.", "무엇을 하고 싶어졌는지 알아차립니다.", "실제로 어떻게 반응했는지 돌아봅니다."], reminder: "필요하면 잠시 호흡이나 발바닥 감각으로 돌아옵니다." },
    entrySchemaId: "reactivity", provenance: ["mindforest_translation"],
  },
  {
    id: "s5", order: 5, title: "허용하고 내버려두기", npc: "개구리", artKey: "session-05",
    memoryCue: "비는 바로 멈추지 않았고, 개구리는 비를 좋아하라고 요구하지도 않았습니다. 바꾸기 어려운 순간에 먼저 자신의 밀어내는 태도와 몸의 반응을 알아차려볼 수 있습니다.",
    representativeHomePractice: { id: "s5_home", title: "바꾸고 싶은 순간에 잠시 머물러보기", summary: "안전한 일상 상황에서 가벼운 불편함이 생겼을 때 해봅니다.", steps: ["무엇을 없애거나 바꾸고 싶은지 알아차립니다.", "몸의 감각과 호흡을 확인합니다.", "짧은 시간 동안 경험을 즉시 고치려 하지 않고 관찰합니다.", "이후 필요한 행동을 선택합니다."], reminder: "위험하거나 해로운 상황에 머물라는 의미가 아닙니다." },
    entrySchemaId: "allowing", provenance: ["mindforest_translation"],
  },
  {
    id: "s6", order: 6, title: "생각은 사실이 아니다", npc: "독수리", artKey: "session-06",
    memoryCue: "같은 사건도 내가 어떤 상태에 있는지에 따라 다르게 해석될 수 있었습니다. 절벽 위에서 보듯 사건과 해석 사이에 조금 거리를 두어볼 수 있습니다.",
    representativeHomePractice: { id: "s6_home", title: "사실 · 상태 · 해석 나누어보기", summary: "기억에 남는 상황 하나를 골라봅니다.", steps: ["사실: 직접 확인 가능한 것은 무엇인지 살펴봅니다.", "상태: 당시 몸과 감정은 어땠는지 살펴봅니다.", "해석: 마음이 그 사건에 붙인 의미를 알아차립니다.", "대응: 한 발 떨어져 본다면 어떤 대응이 가능할지 살펴봅니다."] },
    entrySchemaId: "thought_distance", provenance: ["mindforest_translation"],
  },
  {
    id: "s7", order: 7, title: "어떻게 나 자신을 잘 보살필 수 있을까?", npc: "강아지", artKey: "session-07",
    memoryCue: "같은 하루를 보내도 어떤 활동은 나를 더 소모시키고 어떤 활동은 회복을 돕습니다. 시스템이 정답을 정하는 것이 아니라 내가 내 경험을 기준으로 구분해봅니다.",
    representativeHomePractice: { id: "s7_home", title: "오늘의 활동을 돌아보기", summary: "오늘 한 활동과 나의 경험을 살펴봅니다.", steps: ["오늘 한 활동 몇 가지를 떠올리거나 적어봅니다.", "각 활동이 나를 소모시켰는지, 돌보거나 회복시켰는지 살펴봅니다. 둘 다이거나 잘 모르겠어도 괜찮습니다.", "다음 며칠 동안 의도적으로 이어가고 싶은 작은 행동 하나를 선택합니다."] },
    entrySchemaId: "self_care", provenance: ["mindforest_translation"],
  },
  {
    id: "s8", order: 8, title: "삶과 함께하는 마음챙김", npc: "꿀벌", artKey: "session-08",
    memoryCue: "마지막에는 새로운 기법을 하나 더 배우기보다 지금까지 경험한 연습 중 가져가고 싶은 것을 고릅니다. 꿀벌이 여러 꽃에서 꿀을 모으듯, 자신에게 필요한 연습을 묶어 일상으로 가져갑니다.",
    representativeHomePractice: { id: "s8_home", title: "나의 Practice Kit 만들기", summary: "지금까지 경험한 연습을 나의 일상과 연결해봅니다.", steps: ["이어가고 싶은 연습을 1–3개 선택합니다.", "각 연습을 실제 상황과 연결합니다.", "이 연습을 이어가고 싶은 개인적인 이유를 한 문장으로 적어볼 수 있습니다."] },
    entrySchemaId: "free", provenance: ["mindforest_translation"],
  },
];

const supporting: string[][] = [
  ["body_scan", "mindful_routine", "ten_finger_gratitude"],
  ["body_scan", "sitting_with_breath", "pleasant_experience", "fifty_fifty_attention", "ten_finger_gratitude"],
  ["stretch_and_breath", "mindful_movement", "three_step_breathing_space", "fifty_fifty_attention", "ten_finger_gratitude"],
  ["sitting_practice", "working_with_reactivity", "daily_walking", "fifty_fifty_attention", "ten_finger_gratitude", "experience_awareness"],
  ["sitting_practice", "working_with_difficulty", "three_step_breathing_space", "daily_walking", "random_kindness", "fifty_fifty_attention", "ten_finger_gratitude"],
  ["body_scan", "sitting_with_breath", "stretch_and_breath", "mindful_movement", "sitting_practice", "responding_skilfully", "fifty_fifty_attention", "ten_finger_gratitude", "three_step_breathing_space", "daily_walking", "random_kindness"],
];
const allSupporting = [...new Set(supporting.flat())];
supporting.push(allSupporting, allSupporting);
const firstSeen = new Set<string>();
export const sessionPractices: SessionPractice[] = supporting.flatMap((ids, index) => ids.map((practiceId): SessionPractice => {
  const role = index >= 6 ? "selectable" : firstSeen.has(practiceId) ? (index === 4 ? "recommended" : "continued") : "introduced";
  firstSeen.add(practiceId);
  return { sessionId: `s${index + 1}`, practiceId, role };
}));
