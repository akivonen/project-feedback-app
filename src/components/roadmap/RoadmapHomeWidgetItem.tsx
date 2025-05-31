import React from 'react';
import { Icons } from '../common';

interface RoadmapHomeWidgetItemProps {
  state: string;
  color: string;
  tasksCount?: number;
}

export function RoadmapHomeWidgetItemSkeleton() {
  return (
    <div className="flex animate-pulse justify-between">
      <span className="flex items-center gap-4">
        <Icons.Circle width="8px" className="text-light-200" />
        <div className="h-3 w-20 bg-light-200 pl-2 text-sm md:pl-4"></div>
      </span>
      <span className="h3 w-5 bg-light-200"></span>
    </div>
  );
}

export default function RoadmapHomeWidgetItem({
  state,
  color,
  tasksCount,
}: RoadmapHomeWidgetItemProps) {
  const colorStyles = `text-${color}`;
  return (
    <div className="flex justify-between text-dark-200">
      <span className="flex items-center">
        <Icons.Circle width="8px" className={colorStyles} />
        <span className={tasksCount ? 'pl-4 text-base' : 'pl-2 text-sm md:pl-4'}>{state}</span>
      </span>
      {tasksCount && <strong>{tasksCount}</strong>}
    </div>
  );
}
