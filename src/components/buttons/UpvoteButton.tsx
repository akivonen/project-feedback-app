'use client';
import React, { useEffect, useState } from 'react';
import { Icons } from '../common';
import { Upvote } from '@/types';
import { useSession } from 'next-auth/react';
import { createUpvoteAction, deleteUpvoteAction } from '@/app/actions/upvoteActions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { isInUpvotedList } from '@/lib/utils';

type UpvoteProps = {
  feedbackId: string;
  upvoters: Upvote[];
  isRoadmap?: boolean;
};

const UpvoteButton = ({ feedbackId, upvoters, isRoadmap = false }: UpvoteProps) => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();
  const isInitiallyUpvoted: boolean = isInUpvotedList(upvoters, userId);
  const [isUpvoted, setIsUpvoted] = useState<boolean>(isInitiallyUpvoted);
  const [upvotesCount, setUpvotesCount] = useState<number>(upvoters.length);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsUpvoted(isInUpvotedList(upvoters, userId));
    setUpvotesCount(upvoters.length);
  }, [upvoters, userId]);

  const handleUpvote = async () => {
    if (status === 'loading' || isLoading) {
      return;
    }
    if (!userId) {
      toast.warn('Please signin or signup to upvote.');
      router.push('/auth/signin');
    }

    const prevIsUpvoted = isUpvoted;
    const prevUpvotesCount = upvotesCount;
    try {
      if (userId) {
        setIsUpvoted(!isUpvoted);
        setUpvotesCount(isUpvoted ? upvotesCount - 1 : upvotesCount + 1);
        if (isUpvoted) {
          await deleteUpvoteAction(feedbackId, userId);
        } else {
          await createUpvoteAction(feedbackId, userId);
        }
      }
    } catch (error) {
      setIsUpvoted(prevIsUpvoted);
      setUpvotesCount(prevUpvotesCount);
      const errorMessage = error instanceof Error ? error.message : 'Failed to update upvote';
      console.error('Upvote error', error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonDefaultStyles = isRoadmap
    ? 'lg:py-2.5'
    : 'md:pb-2 md:pt-3 md:max-w-10 md:order-first md:h-fit';
  const buttonUpvotedStyles = isUpvoted ? 'bg-blue-300 text-white' : 'bg-light-300 text-blue-300';
  const isDisabled = isLoading || status === 'loading';
  const buttonDisabledStyles = isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-light-400';

  return (
    <button
      onClick={() => handleUpvote()}
      disabled={isDisabled}
      aria-label={isUpvoted ? `Remove upvote (${upvotesCount})` : `Upvote (${upvotesCount})`}
      className={`w-fit rounded-lg px-4 py-1.5 font-semibold ${buttonDisabledStyles} ${buttonDefaultStyles} ${buttonUpvotedStyles}`}
    >
      <span className={`flex items-center gap-x-2.5 gap-y-2 ${isRoadmap ? '' : 'md:flex-col'}`}>
        <Icons.ArrowUp />
        <strong className="text-sm md:ml-0">{upvotesCount}</strong>
      </span>
    </button>
  );
};

export default UpvoteButton;
