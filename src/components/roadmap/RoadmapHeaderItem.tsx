import React from 'react';
import { Icons } from '../Icons';

type Color = 'orange-200' | 'blue-100' | 'purple-200' | string;

interface RoadmapHeaderItemProps {
  state: string;
  tasksCount: number;
  color: Color;
}

const RoadmapHeaderItem: React.FC<RoadmapHeaderItemProps> = ({ state, color, tasksCount }) => {
  const colorClassname = `text-${color}`;
  const stateCapitalized = `${state[0].toUpperCase()}${state.slice(1)}`;
  return (
    <li className="flex justify-between text-dark-200">
      <span className="flex">
        <Icons.Circle width="8px" className={colorClassname} />
        <span className="pl-4">{stateCapitalized}</span>
      </span>
      <strong>{tasksCount}</strong>
    </li>
  );
};

export default RoadmapHeaderItem;
