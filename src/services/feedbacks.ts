import { getFeedbacksAction } from '@/app/actions/feedback-actions';

const getFeedbacksHandler = async () => {
  try {
    const feedbacks = await getFeedbacksAction();
    return feedbacks;
  } catch (error) {
    console.error('Failed to fetch feedbacks:', error);
    return [];
  }
};

export { getFeedbacksHandler };
