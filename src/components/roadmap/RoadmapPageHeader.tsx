import React from 'react';
import { Button, GoBackButton } from '../buttons';

export default function RoadmapPageHeader() {
  return (
    <header className="flex min-w-[100px] items-center justify-between bg-dark-300 px-6 py-[26px] md:rounded-lg md:px-8 md:py-[27px]">
      <div className="flex flex-col items-start text-white">
        <GoBackButton textColorStyle="text-white" arrowColorStyle="text-light-500" />
        <h1 className="text-lg font-bold -tracking-[0.25px] md:text-2xl md:-tracking-[-0.33px]">
          Roadmap
        </h1>
      </div>
      <Button size="lg" variant="purple" href="/feedbacks/add">
        + Add Feedback
      </Button>
    </header>
  );
}
