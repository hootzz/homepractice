import type { Practice, PracticeType } from "@/lib/types";
import { sessions } from "./sessions";
import { practiceAudio } from './audioSources';

// Functional structures from the content model; concise original Korean copy.
// Research-team review is required before use beyond this prototype.
function guide(id: string, title: string, type: PracticeType, introducedAtSession: number, summary: string, steps: string[], reminder = "가능한 만큼 살펴봅니다. 기록은 남기지 않아도 괜찮습니다."): Practice {
  return { id, title, type, introducedAtSession, summary, steps, reminder, provenance: ["mbct_l", "local_copy"], ...practiceAudio[id] };
}

export const practices: Practice[] = [
  ...sessions.map((session): Practice => ({ ...session.representativeHomePractice, type: "everyday", introducedAtSession: session.order, provenance: ["mindforest_translation", "local_copy"], reminder: session.representativeHomePractice.reminder ?? "알아차린 경험을 평가하지 않아도 괜찮습니다. 기록은 선택입니다." })),
  guide("body_scan", "바디 스캔", "formal", 1, "몸의 여러 부분에서 지금 느껴지는 감각을 살펴봅니다.", ["몸을 두고 있는 자세와 닿는 감각을 알아차립니다.", "몸의 한 부분씩 주의를 옮기며 감각을 살펴봅니다.", "주의가 다른 곳으로 갔다면 알아차리고 몸으로 돌아옵니다."]),
  guide("mindful_routine", "일상 활동 알아차리기", "everyday", 1, "익숙한 일 하나를 하며 감각과 움직임을 알아차립니다.", ["물 마시기나 손 씻기처럼 일상 활동 하나를 고릅니다.", "그 일을 하는 동안 닿는 감각과 몸의 움직임을 살펴봅니다.", "주의가 옮겨간 것을 알면 하고 있는 일로 돌아옵니다."]),
  guide("ten_finger_gratitude", "열 손가락 감사", "everyday", 1, "일상에서 고맙게 느껴지는 것을 하나씩 떠올려봅니다.", ["손가락 하나씩 짚으며 고맙게 느껴진 일을 떠올립니다.", "익숙해서 지나쳤던 작은 것도 살펴봅니다.", "그것을 떠올릴 때의 경험을 알아차립니다."], "억지로 감정을 만들 필요 없이, 떠오르는 만큼 살펴봅니다."),
  guide("sitting_with_breath", "호흡과 함께 앉기", "formal", 2, "앉은 자세에서 호흡이 느껴지는 곳에 주의를 둡니다.", ["앉은 몸의 자세와 접촉감을 알아차립니다.", "호흡이 들어오고 나갈 때의 감각을 느껴봅니다.", "다른 생각을 알아차리면 호흡의 감각으로 돌아옵니다."]),
  guide("pleasant_experience", "기분 좋은 경험 살펴보기", "everyday", 2, "기분 좋았던 일상의 순간과 그때의 경험을 살펴봅니다.", ["기분 좋았던 순간 하나를 떠올립니다.", "그때 몸의 감각, 감정, 생각을 살펴봅니다.", "남기고 싶다면 알아차린 것을 기록해볼 수 있습니다."]),
  guide("fifty_fifty_attention", "안과 밖에 함께 주의 두기", "everyday", 2, "주변 상황과 자신의 몸을 함께 알아차려봅니다.", ["지금 주변에서 일어나는 일을 알아차립니다.", "동시에 몸의 감각과 자세도 살펴봅니다.", "안과 밖으로 주의가 어떻게 움직이는지 알아차립니다."]),
  guide("stretch_and_breath", "스트레칭과 호흡", "formal", 3, "몸을 천천히 움직이며 감각과 호흡을 살펴봅니다.", ["지금 몸의 자세와 호흡을 알아차립니다.", "가능한 범위에서 천천히 몸을 펴며 감각을 살펴봅니다.", "움직임을 멈추고 몸과 호흡을 다시 느껴봅니다."], "몸에 맞는 범위에서 움직이며, 필요하면 멈춥니다."),
  guide("mindful_movement", "마음챙김 움직임", "formal", 3, "움직이는 동안 몸에서 일어나는 경험을 알아차립니다.", ["몸을 움직이기 전 현재의 감각을 살펴봅니다.", "가능한 범위에서 천천히 움직이며 달라지는 감각을 알아차립니다.", "주의가 흩어지면 움직이는 몸으로 돌아옵니다."], "몸에 맞는 범위에서 움직이며, 필요하면 멈춥니다."),
  guide("three_step_breathing_space", "3단계 호흡공간", "formal", 3, "현재 경험을 알아차리고, 호흡에 모인 뒤, 몸 전체로 주의를 넓힙니다.", ["지금의 생각, 감정, 몸의 감각을 알아차립니다.", "호흡이 느껴지는 곳에 주의를 모읍니다.", "호흡을 포함해 몸 전체의 감각으로 주의를 넓힙니다."]),
  guide("sitting_practice", "앉기 연습", "formal", 4, "앉아서 몸, 호흡, 떠오르는 경험을 알아차립니다.", ["앉은 자세와 몸의 접촉감을 느껴봅니다.", "호흡과 몸에서 일어나는 감각을 살펴봅니다.", "생각이나 감정이 떠오르는 것을 알아차립니다.", "필요하면 호흡이나 몸의 감각으로 돌아옵니다."]),
  guide("working_with_reactivity", "반응을 알아차리기", "everyday", 4, "가벼운 불편함에서 반응이 시작되는 과정을 살펴봅니다.", ["불편함이 시작된 상황을 떠올립니다.", "몸, 생각, 감정과 함께 무엇을 하고 싶어졌는지 살펴봅니다.", "필요하면 호흡이나 발바닥의 감각으로 돌아옵니다."]),
  guide("daily_walking", "마음챙김 걷기", "everyday", 4, "일상에서 걷는 동안 발과 몸의 움직임을 알아차립니다.", ["익숙한 길을 걸으며 발이 바닥에 닿는 감각을 느껴봅니다.", "걸음과 몸의 움직임을 살펴봅니다.", "주의가 옮겨가면 알아차리고 발의 감각으로 돌아옵니다."]),
  guide("experience_awareness", "경험 알아차리기", "everyday", 4, "일상의 한 순간에 몸과 마음에서 무엇이 있었는지 살펴봅니다.", ["기억에 남는 순간 하나를 떠올립니다.", "몸의 감각, 감정, 생각을 살펴봅니다.", "그때 무엇을 하고 싶었고 어떻게 반응했는지 알아차립니다."]),
  guide("working_with_difficulty", "어려움과 함께 살펴보기", "formal", 5, "안전한 상황의 가벼운 불편함과 몸의 반응을 살펴봅니다.", ["안전한 일상 상황에서 가벼운 불편함을 알아차립니다.", "몸의 감각과 호흡을 확인합니다.", "잠시 경험을 살펴본 뒤 필요한 행동을 선택합니다."], "위험하거나 해로운 상황에 머물라는 뜻이 아닙니다. 필요하면 멈춥니다."),
  guide("random_kindness", "작은 친절", "everyday", 5, "일상에서 가능한 작은 친절을 선택해봅니다.", ["지금 할 수 있는 작은 친절 하나를 떠올립니다.", "가능한 만큼 행동으로 옮겨봅니다.", "그때 자신의 경험을 살펴봅니다."]),
  guide("responding_skilfully", "알아차리고 대응하기", "everyday", 6, "자동적인 반응을 알아차리고 가능한 대응을 살펴봅니다.", ["잠시 멈추고 지금의 몸, 감정, 생각을 알아차립니다.", "떠오른 생각과 직접 확인 가능한 사실을 살펴봅니다.", "가능한 대응을 살펴보고 필요한 행동을 선택합니다."]),
];
