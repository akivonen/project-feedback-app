import { Feedback } from '@/types';

const getFeedbacksHandler = async (): Promise<Feedback[]> => {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/feedbacks`);
  const response = await res.json();
  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.message || 'Unknown error occurred');
  }
};

export { getFeedbacksHandler };
