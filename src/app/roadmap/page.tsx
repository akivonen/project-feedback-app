import { getAllFeedbacksAction } from '../actions/feedbackActions';
import RoadmapPageContent from '@/components/roadmap/RoadmapPageContent';

export default async function RoadmapPage() {
  const feedbacks = await getAllFeedbacksAction();
  feedbacks.sort((a, b) => (a.upvotes > b.upvotes ? -1 : +1));
  return <RoadmapPageContent feedbacks={feedbacks} />;
}
