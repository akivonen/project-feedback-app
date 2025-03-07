import { Feedback, Status } from '@/types';
import { RoadmapStatus } from '@/types';

export const statusOptions = ['Suggestion', 'Planned', 'In-Progress', 'Live'];

export const roadmapStatus = statusOptions.filter((s) => s !== 'Suggestion');

const isRoadmapStatus = (status: Status): status is RoadmapStatus => {
  return roadmapStatus.includes(status);
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
