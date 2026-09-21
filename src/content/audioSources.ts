import type { Practice } from '@/lib/types';

// PDF: MBCT Key Resources.docx (2).pdf, pp. 7–8 → Oxford Mindfulness.
// URLs were read from the official pages' audio elements on 2026-09-21.
// These support existing practices; they are not recordings of MindForest scenes.
type AudioSource = Pick<Practice, 'audioUrl' | 'audioSource'>;
const source = (file: string, page: string, teacher: string): AudioSource => ({
  audioUrl: `https://oxfordmindfulness.org/wp-content/uploads/${file}`,
  audioSource: { url: `https://oxfordmindfulness.org/free-meditations/${page}`, teacher, language: '영어', provider: 'Oxford Mindfulness' },
});
export const practiceAudio: Record<string, AudioSource> = {
  body_scan: source('2024/11/Nicholas-Hammond-Body-Scan.mp3', 'body-scan-2', 'Nicholas Hammond'),
  three_step_breathing_space: source('2024/10/Breathing-space.mp3', 'example-recorded-practise-4', 'Claire Kelly'),
  sitting_practice: source('2024/10/Jem-Shackleford-sitting_10mins.mp3', 'example-recorded-practise', 'Jem Shackleford'),
  daily_walking: source('2026/05/Sarah-Pace-Mindful-walking-.mp3', 'mindful-walking-by-sarah-pace', 'Sarah Pace'),
};
