import type { Metadata } from 'next';
import Link from 'next/link';
import localFont from 'next/font/local';
import { Navigation } from '@/components/Navigation';
import { WorkbookProvider } from '@/components/WorkbookProvider';
import './globals.css';

// MaruBuri — the Korean serif used for MindForest's in-game dialogue and thought bubbles.
// Self-hosted subset (Latin, punctuation, all 11,172 Hangul syllables); see document/BRAND_TYPE.md.
const maruBuri = localFont({
  src: [
    { path: './fonts/MaruBuri-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/MaruBuri-Bold.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-maruburi',
  fallback: ['AppleMyungjo', 'Batang', 'Noto Serif KR', 'serif'],
});

export const metadata: Metadata = {title:'MindForest · 홈 프랙티스',description:'숲에서 해본 걸, 오늘 한 번 더.'};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="ko" className={maruBuri.variable}><body><a className="skip-link" href="#main">본문으로 건너뛰기</a><div className="shell"><header className="brand"><Link href="/">MindForest<span>홈 프랙티스</span></Link></header><WorkbookProvider><main id="main">{children}</main></WorkbookProvider><Navigation /></div></body></html>; }
