import { Feedback } from '@/types';

const getFeedbacksHandler = async (): Promise<Feedback[]> => {
  const res = await fetch('api/feedbacks');
  const response = await res.json();
  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.message || 'Unknown error occurred');
  }
};

export { getFeedbacksHandler };
