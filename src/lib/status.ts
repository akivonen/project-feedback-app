import { Feedback } from '@/types/feedback';
import { RoadmapStatus, RoadmapDetails, Status } from '@/types/roadmap';

export const statusOptions: Status[] = ['Suggestion', 'Planned', 'In-Progress', 'Live'] as const;
export const roadmapStatuses: RoadmapStatus[] = ['Planned', 'In-Progress', 'Live'] as const;
export const roadmapColors: string[] = ['orange-100', 'purple-200', 'blue-100'] as const;

const roadmapInitial: Record<RoadmapStatus, RoadmapDetails> = {
  Planned: {
    color: roadmapColors[0],
    description: 'Ideas prioritized for research',
    feedbacks: [],
  },
  'In-Progress': {
    color: roadmapColors[1],
    description: 'Currently being developed',
    feedbacks: [],
  },
  Live: { color: roadmapColors[2], description: 'Released featuresh', feedbacks: [] },
};

export const getRoadmapStats = (
  feedbacks: Feedback[] | null
): [RoadmapStatus, RoadmapDetails][] => {
  if (!feedbacks) {
    return Object.entries(roadmapInitial) as [RoadmapStatus, RoadmapDetails][];
  }
  const stats: Record<RoadmapStatus, RoadmapDetails> = feedbacks.reduce((acc, curFeedback) => {
    if (roadmapStatuses.includes(curFeedback.status as RoadmapStatus)) {
      acc[curFeedback.status as RoadmapStatus].feedbacks.push(curFeedback);
    }
    return acc;
  }, structuredClone(roadmapInitial));
  return Object.entries(stats) as [RoadmapStatus, RoadmapDetails][];
};
