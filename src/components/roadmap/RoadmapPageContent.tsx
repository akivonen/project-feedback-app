'use client';
import React, { useMemo, useState } from 'react';
import { Feedback, RoadmapStatus } from '@/types';
import { getRoadmapStats } from '@/lib/status';
import useScreenDetector from '@/hooks/useScreenDetector';
import RoadmapPageTabPanel from './RoadmapPageTabPanel';

type RoadmapPageContentProps = {
  feedbacks: Feedback[];
};

const RoadmapPageContent: React.FC<RoadmapPageContentProps> = ({ feedbacks }) => {
  const roadmapStats = useMemo(() => getRoadmapStats(feedbacks), [feedbacks]);
  const [activeStat, setActiveStat] = useState<RoadmapStatus>('Planned');
  const { isMobile } = useScreenDetector();

  if (!roadmapStats || roadmapStats.length < 1) {
    return (
      <h3 className="mt-10 text-lg font-bold text-dark-400 md:mt-[54px] md:text-2xl">
        There is no roadmap items available.
      </h3>
    );
  }

  return (
    <section className="">
      <ul className="flex border border-b-light-600/25 md:hidden">
        {roadmapStats &&
          roadmapStats.map(([status, props]) => {
            const isActive = activeStat === status;
            const activeButtonStyles = isActive ? `border-b-4 border-b-${props.color}` : '';
            return (
              <li key={status} className="flex-1 text-center">
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`tabpanel-${status}`}
                  className={`w-full pb-4 pt-5 text-sm font-bold -tracking-[0.18px] text-dark-400 ${activeButtonStyles}`}
                  onClick={() => setActiveStat(status as RoadmapStatus)}
                >
                  {`${status} (${props.feedbacks.length})`}
                </button>
              </li>
            );
          })}
      </ul>
      <ul className="mx-6 mt-6 flex gap-2.5 pb-[100px] md:mx-0 lg:mt-12 lg:gap-[30px]">
        {roadmapStats &&
          roadmapStats.map(([status, props]) =>
            isMobile ? (
              <RoadmapPageTabPanel
                key={status}
                status={status}
                props={props}
                isActive={status === activeStat}
              />
            ) : (
              <RoadmapPageTabPanel key={status} status={status} props={props} isActive={true} />
            )
          )}
      </ul>
    </section>
  );
};

export default RoadmapPageContent;
