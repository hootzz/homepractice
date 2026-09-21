import { redirect } from 'next/navigation';
import { COURSE_COMPLETED } from '@/lib/config';
export default function Home(){redirect(COURSE_COMPLETED?'/my-practice':'/sessions');}
