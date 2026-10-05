import { SESSION_IDS, type Session, type WeeklyTask, type Practice, type ContentRelease, type Mode } from '../lib/workbookTypes';
import type { EntrySchema } from '../lib/types';
import { validateRelease } from '../lib/access';

// User-facing titles are concrete nouns from the game scene (REDESIGN §4a, 2026-10-06).
// `internal_name` keeps the MBCT/session construct for research data.
// `memoryCue` is one sentence about what the person did in the game.
export const sessions: Session[] = [
  {id:'s1',order:1,animal:'다람쥐',internal_name:'automatic_pilot',user_facing_name:'호두 관찰',short_description:'늘 쓰는 물건 하나를 처음 보는 것처럼.',memoryCue:'호두를 바로 집어 처리하지 않고, 처음 보는 것처럼 살펴봤어요.',artKey:'session-01'},
  {id:'s2',order:2,animal:'거북이',internal_name:'body_awareness',user_facing_name:'몸 살피기',short_description:'기다리는 순간, 몸의 감각 하나.',memoryCue:'기다리는 동안 몸에서 일어나는 것을 살펴봤어요.',artKey:'session-02'},
  {id:'s3',order:3,animal:'사슴',internal_name:'gathering_attention',user_facing_name:'발걸음',short_description:'마음이 떠나면 발바닥으로.',memoryCue:'마음이 다른 곳으로 갔다는 걸 알아차리고, 발이 닿는 느낌으로 돌아왔어요.',artKey:'session-03'},
  {id:'s4',order:4,animal:'곰',internal_name:'recognize',user_facing_name:'반응의 흐름',short_description:'불편했던 순간을 처음부터 천천히.',memoryCue:'불편함 뒤에 익숙한 반응이 이어지는 흐름을 봤어요.',artKey:'session-04'},
  {id:'s5',order:5,animal:'개구리',internal_name:'allow',user_facing_name:'비와 몸',short_description:'바로 바꾸기 전에 몸의 감각 하나.',memoryCue:'비를 없애지 않고, 몸의 감각으로 잠깐 돌아와 봤어요.',artKey:'session-05'},
  {id:'s6',order:6,animal:'독수리',internal_name:'respond_skilfully',user_facing_name:'생각구름',short_description:'있었던 일과 생각을 조금 떨어뜨려.',memoryCue:'있었던 일과 그때 떠오른 생각을 조금 떨어뜨려 놓고 봤어요.',artKey:'session-06'},
  {id:'s7',order:7,animal:'강아지',internal_name:'self_care',user_facing_name:'돌봄 행동',short_description:'오늘 활동 하나와 작은 돌봄 하나.',memoryCue:'한 활동이 나를 채우기도 하고 지치게 하기도 한다는 걸 살펴봤어요.',artKey:'session-07'},
  {id:'s8',order:8,animal:'꿀벌',internal_name:'maintaining_learning',user_facing_name:'나의 Practice Kit',short_description:'일상에 가져갈 연습을 직접.',memoryCue:'지금까지 해본 연습을 현실에서 다시 꺼내 쓸 방법을 골랐어요.',artKey:'session-08'},
];

function task(n:number,title:string,today:string,steps:string[],schemaId:string,relatedPracticeIds:string[]=[],reminder?:string): WeeklyTask {
  return {id:`week_${n}`,sessionId:SESSION_IDS[n-1],internal_name:`week_${n}`,user_facing_name:title,short_description:today,steps,recordSchemaId:schemaId,relatedPracticeIds,reminder};
}
// `short_description` is the one-line "오늘" summary; `steps` are the 1–3 sentences
// under "오늘 해보기", one action each.
export const previewTasks: WeeklyTask[] = [
  task(1,'호두 관찰','늘 쓰는 물건 하나를 바로 쓰기 전에 보고 만져봐요.',['늘 쓰는 물건 하나를 골라봐요.','그 물건을 쓰려는 순간, 잠깐 멈춰요.','색, 모양, 닿는 느낌, 무게 중 눈길이 가는 것 하나를 천천히 살펴봐요.','느껴지는 만큼 알아차리며 하던 일을 이어가요. 특별한 느낌이 없어도 괜찮아요.'],'walnut_v2'),
  task(2,'몸 살피기','기다리는 순간, 몸의 감각 하나를 찾아봐요.',['오늘 실제로 기다리게 되는 순간 하나를 정해봐요.','그 순간, 생각을 따라가기 전에 몸에서 먼저 느껴지는 곳 하나를 찾아봐요.','어떤 생각이 함께 있는지도 알아봐요. 바꾸지 않아도 괜찮아요.','기분은 어떤가요? 생각과 기분, 몸이 딱 나뉘지 않아도 괜찮아요.'],'waiting_body_v2'),
  task(3,'발걸음','걷다가 마음이 떠나면 발바닥으로 돌아와요.',['오늘 걸을 익숙하고 안전한 길을 정해봐요.','걸으면서 발바닥이 바닥에 닿는 느낌을 살펴봐요.','마음이 다른 곳에 가 있었다는 걸 알아차리면, 어디에 가 있었는지 잠깐 알아봐요.','탓하지 않고, 다음 몇 걸음의 발바닥 감각으로 돌아와요.'],'footsteps_v2',['walking_return']),
  task(4,'반응의 흐름','불편했던 순간 하나를 처음부터 따라가 봐요.',['오늘 있었던 가벼운 불편한 순간 하나를 떠올려봐요.','그때 몸과 마음은 어땠나요?','그 순간 무엇을 하고 싶어졌나요?','실제로 무엇을 했고, 그 뒤엔 무엇이 남았나요? 좋고 나쁨을 정하지 않아도 괜찮아요.'],'reaction_flow_v2'),
  task(5,'비와 몸','바로 바꾸기 전에 몸의 감각 하나를 살펴봐요.',['먼저, 돌아올 감각 하나를 정해둬요.','안전한 일상에서 가벼운 불편함이 생긴 순간을 알아봐요.','곧바로 없애고 싶은 마음이 있다면 그대로 두고, 몸에서 느껴지는 감각 하나를 잠깐 살펴봐요.','필요하면 정해둔 감각으로 돌아와요.'],'rain_body_v2',[],'불편함을 견디는 연습은 아니에요. 필요하면 언제든 멈춰도 괜찮아요.'),
  task(6,'생각구름','생각이 강하게 붙었던 순간 하나를 골라봐요.',['오늘 생각이 강하게 붙었던 순간 하나를 골라봐요.','있었던 일, 그때의 상태, 떠오른 생각을 하나씩 나눠봐요.','떠오른 생각을 하나의 생각구름처럼, 조금 떨어져서 바라봐요. 맞는지 틀린지 정하지 않아도 괜찮아요.','필요하면 잠깐 멈추고, 세 단계로 숨을 골라봐요.','지금 무엇이 도움이 될까요? 아직 떠오르지 않아도 괜찮아요.'],'thought_cloud_v2',['breathing_space']),
  task(7,'돌봄 행동','오늘 활동 하나를 떠올리고 작은 돌봄을 찾아봐요.',['오늘 한 활동 하나를 떠올려봐요.','그 활동은 나에게 어떤 영향을 주었나요?','지금 가능한 작은 돌봄은 무엇일까요? 떠오르는 만큼만 살펴봐요.'],'care_v2'),
  task(8,'나의 Practice Kit','일상에 가져갈 연습을 직접 골라봐요.',['지금까지 해본 연습을 떠올려봐요.','일상에 가져가고 싶은 연습이 무엇인지 생각해봐요. 몇 개든, 하나도 없어도 괜찮아요.','Practice Kit에서 직접 고르고, 언제·어떤 상황에서·왜인지 원하면 적어요.'],'integration'),
];
// Editorial preview ONLY. These two documented candidates are not asserted to be
// approved for the deployed Unity release. No pending Body Scan or catalog extras.
// Korean guides: public YouTube uploads by 한국MBSR마음챙김연구소 (안희영, MBSR/MBCT teacher trainer),
// embedding enabled by the uploader; played through the YouTube player only (no copy, no re-host).
// Procedure checked against the Korean captions on 2026-10-06 (KOREAN_MBCT_AUDIO_MAPPING.md).
const demoRegular: Practice[] = [
  {id:'walking_return',introducedSessionId:'s3',internal_name:'mindful_walking',user_facing_name:'마음챙김 걷기',short_description:'걸음의 감각에 주의를 두고, 마음이 떠나면 돌아와요.',context:'숲길에서처럼, 걸음의 감각에 주의를 두는 연습이에요.',audio:{guide:{kind:'youtube',src:'5ZXdug0sL0o',language:'ko',credit:'한국MBSR마음챙김연구소 · 안희영',practiceMatch:true,usageConfirmed:true}},mbct:{canonicalName:'마음챙김 걷기',book:'『삶과 함께하는 마음챙김』(학지사, 2026)',pages:'80쪽'},steps:['익숙하고 안전한 길에서 걸음을 느껴봐요.','발바닥, 발, 다리의 움직임에 주의를 둬요.','마음이 다른 곳에 가면, 탓하지 않고 발로 돌아와요.'],recordSchemaId:'footsteps_v2',reminder:'마음이 다른 곳에 가는 건 자연스러운 일이에요.',gameDuration:{status:'unspecified'},homeDuration:{status:'unspecified'},frequency:{status:'unspecified'},audioRequirement:{status:'unspecified'}},
  {id:'breathing_space',introducedSessionId:'s3',internal_name:'three_step_breathing_space',user_facing_name:'3단계 호흡 공간',short_description:'지금을 살피고, 호흡에 모았다가, 몸과 주변으로 넓혀요.',context:'살피고, 모으고, 넓히는 세 단계예요.',audio:{guide:{kind:'youtube',src:'n5Sg3KDaw64',language:'ko',credit:'한국MBSR마음챙김연구소 · 안희영',practiceMatch:true,usageConfirmed:true}},mbct:{canonicalName:'호흡 공간법',book:'『삶과 함께하는 마음챙김』(학지사, 2026)',pages:'83쪽 · 102쪽'},steps:['몸의 감각, 감정, 생각, 하고 싶은 마음 등 지금 있는 것을 알아봐요.','호흡을 바꾸려 하지 않고, 들숨과 날숨의 감각에 주의를 모아요.','몸 전체와 주변으로 주의를 넓혀, 다음 순간으로 이어가요.'],recordSchemaId:'attention',reminder:'진정되거나 감정이 바뀌어야 하는 연습은 아니에요.',gameDuration:{status:'unspecified'},homeDuration:{status:'unspecified'},frequency:{status:'unspecified'},audioRequirement:{status:'unspecified'}},
];
export const CONTENT_TODOS = [
  'BLOCKED_CONTENT_RELEASE: V3.3 0903 원문과 authoritative 배포 build의 최종 교차 확인',
  'SCENE_CAPTURES_MISSING: 회기별 대표 게임 캡처(16:9) 미확보 회기는 SceneSketch fallback 사용',
  'S2_BODY_SCAN_PENDING: sequence/audio 연결 및 실제 안내 확인 전 Regular 비출판',
  'S3_REACHABILITY_PENDING: 걷기·세 단계 호흡공간의 실제 씬 도달성 확인',
  'S4_STALE_RESPONSIVE_BREATHING: 최신 Recognize 의도와 Unity controller 충돌; 새 Regular로 추가하지 않음',
  'S5_ALLOW_REVIEW: 수문/손 anchor 구현과 Allow 의도의 대응 확인',
  'S6_RESPOND_REVIEW: 사건/상태/해석 이후 호흡공간·도움될 선택의 구현 대응 확인',
  'S7_CARE_EXAMPLES: 게임 속 실제 돌봄 행동 예시 미확보; 직접 입력만 제공',
  'KOREAN_AUDIO_UNVERIFIED: 검증된 한국어 공식 음원 없음; 텍스트 안내 유지',
] as const;
export function getRelease(mode: Mode): ContentRelease {
  const release: ContentRelease = {
    // The release id is a storage contract; content copy changes do not alter IDs.
    id: mode==='demo'?'mindforest-review-demo-v3':'mindforest-awaiting-release-v3',mode,
    practices: mode==='demo'?demoRegular:[], weeklyTasks: mode==='demo'?previewTasks:[],
    bundles: SESSION_IDS.map(id=>({sessionId:id,regularPracticeIds:mode==='demo'&&id==='s3'?demoRegular.map(p=>p.id):[],...(mode==='demo'?{sessionSpecificTaskId:`week_${id.slice(1)}`}:{})})),
  };
  validateRelease(release); return release;
}
function schema(id:string,title:string,questions:([string,string]|[string,string,'short'])[]): EntrySchema {
  return {id,title,questions:questions.map(([key,label,size])=>({key,label,multiline:size!=='short'}))};
}
// Current record schemas (v2 names). Earlier schemas stay below so existing records keep
// their own keys; every record also stores its question snapshot.
export const schemas: EntrySchema[] = [
  schema('walnut_v2','호두 관찰',[['object','어떤 물건이었나요?','short'],['overlooked','평소에는 지나쳤던 게 있었나요?']]),
  schema('waiting_body_v2','몸 살피기',[['situation','어떤 기다림이었나요?','short'],['first_body','몸에서 가장 먼저 눈에 들어온 곳은 어디였나요?']]),
  schema('footsteps_v2','발걸음',[['path','어느 길이었나요?','short'],['went_returned','마음은 어디에 가 있었고, 무엇으로 돌아왔나요?']]),
  schema('reaction_flow_v2','반응의 흐름',[['event','무슨 일','short'],['state','몸과 마음','short'],['urge','하고 싶었던 것','short'],['action','실제로 한 것','short']]),
  schema('rain_body_v2','비와 몸',[['anchor','돌아올 감각','short'],['noticed','잠깐 살펴보니 무엇이 있었나요?']]),
  schema('thought_cloud_v2','생각구름',[['event','있었던 일','short'],['state','그때의 상태','short'],['thought','떠오른 생각','short'],['helpful','지금 도움이 되는 것은 무엇이었나요?']]),
  schema('care_v2','돌봄 행동',[['activity','오늘 한 활동','short'],['effect','나에게 어떤 영향을 주었나요?','short'],['care','지금 가능한 작은 돌봄']]),
  schema('integration','나의 Practice Kit',[['cue','언제 어떤 연습을 이어가고 싶나요?'],['reason','나에게 어떤 이유가 있나요?']]),
  schema('attention','마음이 돌아온 순간',[['attention_went','마음은 어디로 갔나요?'],['return_anchor','무엇을 느끼며 돌아왔나요?'],['noticed_after','돌아온 뒤 무엇을 알아차렸나요?']]),
  // Earlier schemas — kept for reading/editing existing records only.
  schema('sensory','잠시 멈춘 순간',[['noticed','무엇을 알아차렸나요?'],['moment','어떤 순간이었나요?']]),
  schema('body','몸에서 느낀 것',[['body','몸에서는 무엇이 느껴졌나요?'],['thought','어떤 생각이 함께 있었나요?'],['feeling','감정이나 기분은 어땠나요?']]),
  schema('reactivity_v3','반응의 흐름',[['impulse','무엇을 하고 싶어졌나요?'],['trigger','어떤 불편함이 있었나요?'],['body','몸에서는 무엇이 느껴졌나요?'],['action','어떤 행동이 이어졌나요?'],['after','그 뒤에는 무엇이 있었나요?']]),
  schema('allowing_v3','가능한 만큼 살펴본 경험',[['noticed','몸의 감각과 함께 무엇을 알아차렸나요?'],['urge','무엇을 없애고 싶었나요?'],['anchor','돌아올 감각은 무엇이었나요?']]),
  schema('thought_v3','생각과 사실 사이',[['event','실제로 어떤 일이 있었나요?'],['state','그때 몸과 마음은 어떤 상태였나요?'],['interpretation','어떤 해석이 떠올랐나요?'],['distance','한 걸음 떨어져 보니 무엇을 알아차렸나요?'],['helpful','지금 무엇이 도움이 될까요?']]),
  schema('care','오늘의 활동 돌아보기',[['activity','어떤 활동을 했나요?'],['effect','나에게 어떤 영향을 주었나요? 상황에 따라 달랐거나 잘 모르겠어도 괜찮아요.'],['small_action','이어가고 싶은 작은 행동이 있나요?']]),
];
