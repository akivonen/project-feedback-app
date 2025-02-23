'use client';
import React from 'react';
import Link from 'next/link';
import RoadmapHeaderItem from './RoadmapHeaderItem';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getFeedbacksHandler } from '@/services/feedbacks';
import { getRoadmapStats } from '@/services/roadmap';

const RoadmapHeaderList: React.FC = () => {
  const { data: feedbacks } = useSuspenseQuery({
    queryKey: ['feedbacks'],
    queryFn: () => getFeedbacksHandler(),
  });

  const roadmapStats = getRoadmapStats(feedbacks);

  const roadmapBulletsColors = ['orange-100', 'purple-200', 'blue-100'];
  const roadmapList = Object.entries(roadmapStats).map(([state, tasksCount], index) => ({
    state,
    tasksCount,
    color: roadmapBulletsColors[index],
  }));
  return (
    <div className="w-full min-w-[223px] rounded-lg bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-bold text-dark-400">Roadmap</h2>
        <Link href="/roadmap" className="text-sm font-semibold text-blue-300 underline">
          View
        </Link>
      </div>
      <ul className="mt-6">
        {roadmapList.map((item) => (
          <RoadmapHeaderItem
            key={item.state}
            state={item.state}
            tasksCount={item.tasksCount}
            color={item.color}
          />
        ))}
      </ul>
    </div>
  );
};

export default RoadmapHeaderList;
