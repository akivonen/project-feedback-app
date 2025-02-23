'use client';
import React from 'react';
import { useState } from 'react';
import Burger from './Burger';
import MobileMenu from './MobileMenu';
import FeedbackCategories from './FeedbackCategories';
import RoadmapHeaderList from './roadmap/RoadmapHeaderList';

const Header: React.FC = () => {
  const [isOpen, toggleMobileMenu] = useState(false);

  return (
    <header className="relative">
      <div className="gap-x-[10px] gap-y-6 md:flex lg:max-w-[255px] lg:flex-col xl:max-w-[255]">
        <div className="md:flex md:flex-1">
          <div className="flex w-full bg-[url('/images/header/mobile/background-header.png')] bg-[length:100%_100%] bg-no-repeat px-6 py-4 md:min-w-[223px] md:rounded-lg md:bg-[url('/images/header/tablet/background-header.png')] md:pb-6 lg:min-h-[137px] xl:max-w-[255px] xl:bg-[url('/images/header/desktop/background-header.png')]">
            <div className="flex flex-col justify-end">
              <h1 className="text-[15px] text-white md:text-[20px]">Frontend Mentor</h1>
              <span className="text-sm text-white/75 md:text-[15px]">Feedback Board</span>
            </div>
            <Burger isOpen={isOpen} handleClick={toggleMobileMenu} />
          </div>
        </div>

        <div className="hidden md:flex md:flex-1">
          <FeedbackCategories />
        </div>
        <div className="hidden md:flex md:flex-1">
          <RoadmapHeaderList />
        </div>
      </div>

      {isOpen && <MobileMenu />}
    </header>
  );
};
export default Header;
