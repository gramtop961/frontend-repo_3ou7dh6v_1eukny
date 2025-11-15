import type { GenerateRequest, GenerateResponse, UserState } from '@/types';

const CHECK_USER_URL = import.meta.env.VITE_N8N_CHECK_USER_URL as string;
const GENERATE_URL = import.meta.env.VITE_N8N_GENERATE_URL as string;

export async function checkUser(telegramUserId: number): Promise<Pick<UserState, 'isPaid' | 'freeCredits'>> {
  const res = await fetch(CHECK_USER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ telegramUserId })
  });
  if (!res.ok) throw new Error('Failed to check user');
  return res.json();
}

export async function generateLesson(payload: GenerateRequest): Promise<GenerateResponse> {
  const res = await fetch(GENERATE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to generate lesson');
  return res.json();
}
