import React from 'react';
import Link from 'next/link';
import RoadmapHomeWidgetItem from './RoadmapHomeWidgetItem';
import { getRoadmapStats } from '@/lib/status';
import LoadingSpinner from '../LoadingSpinner';
import { Feedback } from '@/types';

export const RoadmapHomeWidgetSkeleton = () => {
  return (
    <div className="w-full min-w-[223px] rounded-lg bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-bold text-dark-400">Roadmap</h2>
        <Link href="/roadmap" className="text-sm font-semibold text-blue-300 underline">
          View
        </Link>
      </div>
      <LoadingSpinner />
    </div>
  );
};

type RoadmapHomeWidgetProps = {
  feedbacks: Feedback[];
};

const RoadmapHomeWidget: React.FC<RoadmapHomeWidgetProps> = ({ feedbacks }) => {
  const roadmapStats = getRoadmapStats(feedbacks);

  return (
    <div className="w-full min-w-[223px] rounded-lg bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-bold text-dark-400">Roadmap</h2>
        <Link href="/roadmap" className="text-sm font-semibold text-blue-300 underline">
          View
        </Link>
      </div>
      <ul className="mt-6">
        {roadmapStats &&
          roadmapStats.map(([status, props]) => (
            <li key={status}>
              <RoadmapHomeWidgetItem
                state={status}
                tasksCount={props.feedbacks.length}
                color={props.color}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default RoadmapHomeWidget;
