import { RoadmapStatus, RoadmapDetails, Feedback } from '@/types';
import { FeedbackItem } from '../suggestions';
import { memo } from 'react';

type RoadmapPageTabPanelProps = { status: RoadmapStatus; props: RoadmapDetails; isActive: boolean };

const RoadmapPageTabPanel: React.FC<RoadmapPageTabPanelProps> = memo(
  ({ status, props, isActive }) => {
    return (
      <li
        key={status}
        className={`w-full sm:flex sm:max-w-[] sm:flex-1 sm:flex-col ${isActive ? '' : 'hidden'}`}
        role="tabpanel"
        id={`tabpanel-${status}`}
        aria-labelledby={`tab-${status}`}
      >
        <h2 className="text-lg font-bold -tracking-[0.25px] text-dark-400">{`${status} (${props.feedbacks.length})`}</h2>
        <p className="mt-1 text-sm text-dark-200 md:text-[14px] lg:text-base">
          {props.description}
        </p>
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
);
RoadmapPageTabPanel.displayName = 'RoadmapPageTabPanel';
export default RoadmapPageTabPanel;
