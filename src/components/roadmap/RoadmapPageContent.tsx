'use client';
import React, { useMemo, useState } from 'react';
import { Feedback, RoadmapStatus } from '@/types';
import { getRoadmapStats } from '@/lib/status';
import useScreenDetector from '@/hooks/useScreenDetector';
import { RoadmapPageTabPanel, RoadmapPageTabPanelSkeleton } from './';

export function RoadmapPageContentSkeleton() {
  const { isMobile } = useScreenDetector();
  return (
    <section>
      <div className="flex animate-pulse gap-x-4 border border-b-light-600/25 md:hidden">
        <div className="mb-4 mt-5 h-5 w-1/3 bg-dark-100/25"></div>
        <div className="mb-4 mt-5 h-5 w-1/3 bg-dark-100/25"></div>
        <div className="mb-4 mt-5 h-5 w-1/3 bg-dark-100/25"></div>
      </div>
      <ul className="mx-6 mt-6 flex gap-2.5 pb-[100px] md:mx-0 lg:mt-12 lg:gap-[30px]">
        {isMobile ? (
          <RoadmapPageTabPanelSkeleton />
        ) : (
          [...Array(3)].map((_, i) => (
            <li key={i} className="w-full">
              <RoadmapPageTabPanelSkeleton />
            </li>
          ))
        )}
      </ul>
    </section>
  );
}

export default function RoadmapPageContent({ feedbacks }: { feedbacks: Feedback[] }) {
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
    <section>
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
}
