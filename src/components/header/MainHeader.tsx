import React from 'react';
import Link from 'next/link';
import MainHeaderAuth from './MainHeaderAuth';
import { Burger } from '@/components/common';
import { FeedbackCategories } from '@/components/feedback/';
import { RoadmapHomeWidget } from '@/components/roadmap/';

export default function MainHeader() {
  return (
    <nav className="relative" aria-label="Sidebar navigation">
      <div className="gap-x-[10px] gap-y-6 md:flex lg:max-w-[255px] lg:flex-col xl:max-w-[255]">
        <div className="md:flex md:flex-1">
          <div className="flex w-full bg-[url('/images/header/mobile/background-header.png')] bg-[length:100%_100%] bg-no-repeat px-6 py-4 md:min-w-[223px] md:rounded-lg md:bg-[url('/images/header/tablet/background-header.png')] md:pb-6 lg:min-h-[137px] xl:max-w-[255px] xl:bg-[url('/images/header/desktop/background-header.png')]">
            <div className="flex w-full items-center justify-between pr-4 md:items-end md:p-0">
              <Link href="/" className="flex flex-col md:justify-end">
                <h1 className="text-[15px] text-white md:text-[20px]">Frontend Mentor</h1>
                <span className="text-sm text-white/75 md:text-[15px]">Feedback Board</span>
              </Link>
              <MainHeaderAuth />
            </div>
            <Burger>
              <FeedbackCategories />
              <RoadmapHomeWidget />
            </Burger>
          </div>
        </div>
        <div className="hidden md:flex md:flex-1">
          <FeedbackCategories />
        </div>
        <div className="hidden md:flex md:flex-1">
          <RoadmapHomeWidget />
        </div>
      </div>
    </nav>
  );
}
