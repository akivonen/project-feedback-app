'use client';
import React, { useEffect, useState, memo } from 'react';
import { Icons } from '../common/Icons';
import { useRouter } from 'next/navigation';

type GoBackButtonProps = {
  textColorStyle?: string;
  arrowColorStyle?: string;
};

function GoBackButton({
  textColorStyle = 'text-dark-200',
  arrowColorStyle = 'text-blue-300',
}: GoBackButtonProps) {
  const router = useRouter();
  const [hasHistory, setHasHistory] = useState(false);

  useEffect(() => {
    setHasHistory(window.history.length > 1);
  }, []);
  const handleRedirect = () => {
    if (!router) {
      console.error('Router unavailable');
      return;
    }
    return hasHistory ? router.back() : router.push('/');
  };

  const ariaLabel = hasHistory ? 'Go back to the previous page' : 'Go to the main page';

  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        handleRedirect();
      }}
      type="button"
      className={`flex items-center justify-between gap-4 text-sm font-bold hover:underline hover:decoration-solid md:text-[14px] ${textColorStyle}`}
      aria-label={ariaLabel}
      disabled={!router}
    >
      <span data-testid="arrow-left-container" className={arrowColorStyle}>
        <Icons.ArrowLeft aria-hidden data-testid="arrow-left" />
      </span>
      <span>Go Back</span>
    </button>
  );
}

export default memo(GoBackButton);
