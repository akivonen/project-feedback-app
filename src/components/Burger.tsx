'use client';
import React, { useState } from 'react';

type BurgerProps = {
  children: React.ReactNode;
};

const Burger: React.FC<BurgerProps> = ({ children }) => {
  const [isOpen, toggleMobileMenu] = useState(false);

  return (
    <>
      <button
        onClick={() => toggleMobileMenu(!isOpen)}
        id="mobile-menu-button"
        className="my-auto ml-auto block cursor-pointer md:hidden"
      >
        <span
          className={`relative block h-[3px] w-[20px] rounded-full bg-white transition-all ${isOpen && 'top-[7px] rotate-45'}`}
        ></span>
        <span
          className={`mt-1 block h-[3px] w-[20px] rounded-full bg-white transition-all ${isOpen ? 'opacity-0' : 'opacity-100'}`}
        ></span>
        <span
          className={`relative mt-1 block h-[3px] w-[20px] rounded-full bg-white transition-all ${isOpen && '-top-[7px] -rotate-45'}`}
        ></span>
      </button>
      {isOpen && children}
    </>
  );
};

export default Burger;
