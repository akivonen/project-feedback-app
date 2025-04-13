'use client';
import React, { useEffect, useState } from 'react';
import { Icons } from '../Icons';
import { useRouter } from 'next/navigation';

type GoBackButtonButtonProps = {
  textColorStyle?: string;
  arrowColorStyle?: string;
};

const GoBackButtonButton: React.FC<GoBackButtonButtonProps> = ({
  textColorStyle = 'text-dark-200',
  arrowColorStyle = 'text-blue-300',
}) => {
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
      className={`flex items-center justify-between gap-4 text-sm font-bold hover:underline hover:decoration-solid md:text-[14px] ${textColorStyle}`}
      aria-label={ariaLabel}
    >
      <span className={arrowColorStyle}>
        <Icons.ArrowLeft />
      </span>
      <span>Go Back</span>
    </button>
  );
};

export default GoBackButtonButton;
