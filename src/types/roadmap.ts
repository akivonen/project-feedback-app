import { Feedback } from './feedback';

export type Category = 'UI' | 'UX' | 'Enhancement' | 'Bug' | 'Feature';
export type FilterCategory = Category | 'All';
export type Status = 'Suggestion' | 'Planned' | 'In-Progress' | 'Live';
export type RoadmapStatus = Exclude<Status, 'Suggestion'>;

export type Roadmap = Record<RoadmapStatus, number>;

export type RoadmapDetails = {
  color: string;
  description: string;
  feedbacks: Feedback[];
};
