import { Feedback } from '@/types';
import { RoadmapStatus } from '@/types';

const isRoadmapStatus = (status: string): status is RoadmapStatus => {
  return ['planned', 'in-progress', 'live'].includes(status);
};

const getRoadmapStats = (feedbacks: Feedback[]) =>
  feedbacks.reduce(
    (acc, curr) => {
      if (isRoadmapStatus(curr.status)) {
        acc[curr.status] += 1;
      }
      return acc;
    },
    { planned: 0, 'in-progress': 0, live: 0 }
  );

export { getRoadmapStats };
