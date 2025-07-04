import { RoadmapStatus, RoadmapDetails, Feedback } from '@/types';
import { FeedbackItem, FeedbackItemSkeleton } from '../feedback';
import { memo } from 'react';

type RoadmapPageTabPanelProps = { status: RoadmapStatus; props: RoadmapDetails; isActive: boolean };

export function RoadmapPageTabPanelSkeleton() {
  return (
    <div className="w-full animate-pulse sm:flex sm:flex-1 sm:flex-col">
      <div className="h-5 w-1/3 bg-dark-100/25"></div>
      <div className="mt-1 h-4 w-1/2 bg-dark-100/25"></div>
      <ul className="mt-6 flex flex-col gap-4">
        {[...Array(3)].map((_, i) => (
          <li key={i}>
            <FeedbackItemSkeleton isRoadmap />
          </li>
        ))}
      </ul>
    </div>
  );
}

function RoadmapPageTabPanel({ status, props, isActive }: RoadmapPageTabPanelProps) {
  return (
    <li
      key={status}
      className={`w-full sm:flex sm:flex-1 sm:flex-col ${isActive ? '' : 'hidden'}`}
      role="tabpanel"
      id={`tabpanel-${status}`}
      aria-labelledby={`tab-${status}`}
    >
      <h2 className="text-lg font-bold -tracking-[0.25px] text-dark-400">{`${status} (${props.feedbacks.length})`}</h2>
      <p className="mt-1 text-sm text-dark-200 md:text-[14px] lg:text-base">{props.description}</p>
      <ul className="mt-6 flex flex-col gap-4">
        {props.feedbacks.length > 0 &&
          props.feedbacks.map((feedback: Feedback) => (
            <li key={feedback.id}>
              <FeedbackItem feedback={feedback} isRoadmap isLink roadmapColor={props.color} />
            </li>
          ))}
      </ul>
    </li>
  );
}

export default memo(RoadmapPageTabPanel);
