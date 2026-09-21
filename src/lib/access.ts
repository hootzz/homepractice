import { CURRENT_SESSION, COURSE_COMPLETED } from './config';
export const availableSession = COURSE_COMPLETED ? 8 : CURRENT_SESSION;
export const canAccessSession = (order: number) => order >= 1 && order <= availableSession;
export const canAccessPractice = (introducedAtSession: number) => introducedAtSession <= availableSession;
export const canPlan = () => availableSession >= 7;
