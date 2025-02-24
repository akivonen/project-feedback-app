'use client';
import React from 'react';
import { Icons } from '../Icons';
import { useRouter } from 'next/navigation';

const GoBack: React.FC = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center justify-between px-4 py-[10px] text-[14px] font-bold text-dark-200 md:px-6 md:py-3 md:text-[14px]"
    >
      <span className="text-blue-300">
        <Icons.ArrowLeft />
      </span>{' '}
      <span className="ml-4">Go Back</span>
    </button>
  );
};

export default GoBack;
