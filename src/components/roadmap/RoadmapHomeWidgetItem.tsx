import React from 'react';
import { Icons } from '../Icons';

interface RoadmapHomeWidgetItemProps {
  state: string;
  color: string;
  tasksCount?: number;
}

const RoadmapHomeWidgetItem: React.FC<RoadmapHomeWidgetItemProps> = ({
  state,
  color,
  tasksCount,
}) => {
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
};

export default RoadmapHomeWidgetItem;
