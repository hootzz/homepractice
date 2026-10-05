'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export function Navigation(){const pathname=usePathname(); const links = [['/','홈'],['/sessions','이야기'],['/entries','기록'],['/my-practice','나의 연습']]; return <nav className="navigation" aria-label="주 메뉴">{links.map(([href,label])=>{const active=href==='/'?pathname==='/':pathname.startsWith(href);return <Link key={href} href={href} className={active?'active':''} aria-current={active?'page':undefined}>{label}</Link>})}</nav>;}
