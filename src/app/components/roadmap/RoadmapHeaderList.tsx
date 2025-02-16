import React from "react";
import Link from "next/link";
import RoadmapHeaderItem from "./RoadmapHeaderItem";

const RoadmapHeaderList: React.FC = () => {
  const roadmapList = [
    {
      state: "Planned",
      tasksCount: 2,
      color: "orange-100",
    },
    {
      state: "In-Progress",
      tasksCount: 3,
      color: "purple-200",
    },
    {
      state: "Live",
      tasksCount: 1,
      color: "blue-100",
    },
  ];
  return (
    <div className="w-full min-w-[223px] rounded-lg bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-bold text-dark-400">Roadmap</h2>
        <Link
          href="/roadmap"
          className="text-sm font-semibold text-blue-300 underline"
        >
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
