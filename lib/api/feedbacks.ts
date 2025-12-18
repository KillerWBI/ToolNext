import { Feedback } from '@/types/feedback';

export async function getFeedbacks(): Promise<Feedback[]> {
  const res = await fetch(`${process.env.API_URL}/feedbacks`, {
    cache: 'no-store', // або next: { revalidate: 60 }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch feedbacks');
  }

  return res.json();
}