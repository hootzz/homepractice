import {notFound} from 'next/navigation';
import {canPlan} from '@/lib/access';
import {PracticePlanBuilder} from '@/components/PracticePlanBuilder';
export default function MyPractice(){if(!canPlan())notFound();return <PracticePlanBuilder/>;}
