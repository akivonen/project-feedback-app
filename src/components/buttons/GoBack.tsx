'use client';
import React, { useEffect, useState } from 'react';
import { Icons } from '../Icons';
import { useRouter } from 'next/navigation';

const GoBack: React.FC = () => {
  const router = useRouter();
  const [hasHistory, setHasHistory] = useState(false);

  useEffect(() => {
    setHasHistory(window.history.length > 1);
  }, []);
  const handleRedirect = () => (hasHistory ? router.back() : router.push('/'));
  const ariaLabel = hasHistory ? 'Go back to the previous page' : 'Go to the main page';

  return (
    <button
      onClick={() => handleRedirect()}
      className="flex items-center justify-between py-[10px] text-[14px] font-bold text-dark-200 hover:underline hover:decoration-solid md:px-6 md:py-3 md:text-[14px]"
      aria-label={ariaLabel}
    >
      <span className="text-blue-300">
        <Icons.ArrowLeft />
      </span>
      <span className="ml-4">Go Back</span>
    </button>
  );
};

export default GoBack;
