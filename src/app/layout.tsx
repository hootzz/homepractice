import type { Metadata } from 'next';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import './globals.css';
export const metadata: Metadata = {title:'MindForest · 홈 프랙티스',description:'게임 속 경험을 일상의 작은 연습으로 이어가는 워크북'};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="ko"><body><a className="skip-link" href="#main">본문으로 건너뛰기</a><div className="shell"><header className="brand"><Link href="/sessions">MindForest<span>홈 프랙티스</span></Link></header><main id="main">{children}</main><Navigation /></div></body></html>; }
