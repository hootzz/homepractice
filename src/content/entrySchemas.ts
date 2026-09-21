import type { EntrySchema } from "@/lib/types";

function schema(id: string, title: string, fields: [string, string][]): EntrySchema {
  return { id, title, intro: "남기고 싶은 것만 적어도 괜찮습니다. 모든 질문은 선택사항입니다.", questions: fields.map(([key, label]) => ({ key, label, multiline: true })) };
}

export const entrySchemas: EntrySchema[] = [
  schema("reflection", "잠시 멈춘 순간", [
    ["moment", "방금 자동으로 하려던 것은 무엇이었나요?"],
    ["noticed", "잠시 멈췄을 때 이전에는 지나쳤던 무엇을 알아차렸나요?"],
  ]),
  schema("experience", "하나의 경험 살펴보기", [
    ["experience", "어떤 경험이 기억에 남나요?"], ["body", "몸 어디에서 어떤 감각을 느꼈나요?"],
    ["feeling", "그때의 감정이나 기분은 어땠나요?"], ["thought", "어떤 생각이 함께 있었나요?"], ["impulse", "무엇을 하고 싶어졌나요?"],
  ]),
  schema("attention_return", "주의가 돌아온 순간", [
    ["what_pulled_attention", "무엇에 주의가 옮겨갔나요?"], ["return_anchor", "무엇을 느끼며 돌아왔나요?"], ["noticed_after_return", "돌아온 뒤 무엇을 알아차렸나요?"],
  ]),
  schema("reactivity", "반응이 시작되는 순간", [
    ["trigger", "무엇이 불편함을 촉발했나요?"], ["body", "몸에서 먼저 어떤 감각이 나타났나요?"],
    ["feeling_thought", "어떤 감정이나 생각이 뒤따랐나요?"], ["impulse", "무엇을 하고 싶어졌나요?"], ["response", "실제로 어떻게 반응했나요?"],
  ]),
  schema("allowing", "잠시 머물러본 경험", [
    ["situation", "어떤 안전한 일상 상황이었나요?"], ["urge_to_change", "무엇을 없애거나 바꾸고 싶었나요?"],
    ["body", "몸의 감각과 호흡은 어땠나요?"], ["what_happened_when_pausing", "잠시 멈춰 살펴보니 무엇이 있었나요?"],
  ]),
  schema("thought_distance", "사실과 해석 살펴보기", [
    ["event", "어떤 사건이 있었나요?"], ["state", "당시 몸과 감정은 어땠나요?"], ["interpretation", "마음은 어떤 의미를 붙였나요?"],
    ["fact", "직접 확인할 수 있는 사실은 무엇인가요?"], ["possible_response", "한 발 떨어져 본다면 어떤 대응이 가능할까요?"],
  ]),
  schema("self_care", "오늘의 활동 돌아보기", [
    ["activity", "오늘 어떤 활동을 했나요?"], ["effect", "나를 소모시켰나요, 돌보거나 회복시켰나요? 둘 다이거나 잘 모르겠어도 괜찮아요."],
    ["small_action", "다음 며칠 동안 이어가고 싶은 작은 행동은 무엇인가요?"],
  ]),
  schema("free", "자유 기록", [["noticed", "남기고 싶은 경험이나 알아차린 것이 있나요?"]]),
];
