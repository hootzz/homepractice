'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { COURSE_COMPLETED } from '@/lib/config';
export function Navigation(){const pathname=usePathname(); const links = [...(COURSE_COMPLETED ? [['/my-practice','나의 연습']] : []),['/sessions','회기'],['/entries','기록']]; return <nav className="navigation" aria-label="주 메뉴">{links.map(([href,label])=><Link key={href} href={href} className={pathname.startsWith(href)?'active':''} aria-current={pathname.startsWith(href)?'page':undefined}>{label}</Link>)}</nav>;}
