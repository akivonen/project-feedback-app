import React from "react";
import FeedbackCategories from "./FeedbackCategories";
import RoadmapHeaderList from "./RoadmapHeaderList";

const MobileMenu: React.FC = () => {
  return (
    <div className="absolute right-0 flex h-[calc(100vh-74px)] max-w-[271] flex-col gap-y-6 bg-light-200 p-6 md:hidden">
      <FeedbackCategories />
      <RoadmapHeaderList />
    </div>
  );
};

export default MobileMenu;
