'use client';
import { useState } from 'react';
import type { Practice } from '@/lib/types';

export function AudioGuide({ url, source }: { url: string; source?: Practice['audioSource'] }) {
  const [failed, setFailed] = useState(false);
  return <div className="section">
    <h2>오디오 안내</h2>
    {source && <p className="muted">{source.language} 안내 · {source.teacher}<br/>{source.provider}</p>}
    <audio aria-label="연습 오디오 안내" controls preload="none" src={url} onError={() => setFailed(true)}>
      위의 글 안내로 연습할 수 있습니다.
    </audio>
    {failed && <p role="status">오디오를 불러오지 못했어요. 원문 페이지에서 듣거나 위의 글 안내로 이어가세요.</p>}
    {source && <a className="text-link" href={source.url} target="_blank" rel="noopener noreferrer">원문에서 오디오 듣기 ↗ <span className="muted">(새 탭)</span></a>}
  </div>;
}
