'use client';
import React, { useState } from 'react';

export default function Burger({ children }: { children?: React.ReactNode }) {
  const [isOpen, toggleMobileMenu] = useState(false);

  return (
    <>
      <button
        onClick={() => toggleMobileMenu(!isOpen)}
        className="my-auto ml-auto block cursor-pointer md:hidden"
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
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
      {isOpen && (
        <div
          id="mobile-menu"
          role="mobile-menu"
          className="absolute right-0 top-[74px] flex h-[calc(100vh-74px)] max-w-[271] flex-col gap-y-6 bg-light-200 p-6 md:hidden"
        >
          {children}
        </div>
      )}
    </>
  );
}
