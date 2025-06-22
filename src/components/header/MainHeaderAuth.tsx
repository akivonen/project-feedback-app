'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Icons } from '../common';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { LoadingSpinner } from '../common';

export default function MainHeaderAuth() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutSide = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as HTMLElement)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutSide);
      return () => {
        document.removeEventListener('mousedown', handleClickOutSide);
      };
    }
  }, [isOpen]);

  return (
    <div className="flex items-end">
      {status === 'loading' ? (
        <LoadingSpinner />
      ) : session ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="profile-dropdown"
          aria-label="Toggle profile menu"
        >
          <Icons.Logout />
        </button>
      ) : (
        <Link href="/auth/signin">
          <Icons.Login />
        </Link>
      )}
      {isOpen && (
        <div ref={dropdownRef} className="absolute">
          <div className="relative right-10 top-[-10px]">
            <ul
              className={`text absolute top-[calc(100%+18px)] z-30 flex w-fit min-w-[100px] flex-col rounded-lg bg-white shadow-dropShadow`}
              role="menu"
              aria-labelledby="dropdown-label"
            >
              <li className="border-b border-dark-400/15 last:border-b-0">
                <Link
                  href="/auth/profile"
                  className="flex w-full items-center justify-between px-6 py-3 text-base text-dark-200 hover:text-purple-200"
                  role="menuitem"
                >
                  Profile
                </Link>
              </li>
              <li className="border-b border-dark-400/15 last:border-b-0">
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex w-full items-center justify-between px-6 py-3 text-base text-dark-200 hover:text-purple-200"
                  role="menuitem"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
