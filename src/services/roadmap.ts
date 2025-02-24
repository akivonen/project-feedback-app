import { Feedback, Status } from '@/types';
import { RoadmapStatus } from '@/types';

const isRoadmapStatus = (status: Status): status is RoadmapStatus => {
  return ['Planned', 'In-Progress', 'Live'].includes(status);
};

const getRoadmapStats = (feedbacks: Feedback[]) =>
  feedbacks.reduce(
    (acc, curr) => {
      if (isRoadmapStatus(curr.status)) {
        acc[curr.status] += 1;
      }
      return acc;
    },
    { Planned: 0, 'In-Progress': 0, Live: 0 }
  );

export { getRoadmapStats };
