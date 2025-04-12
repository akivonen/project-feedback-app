'use client';
import React, { useEffect, useState } from 'react';
import { Icons } from './Icons';
import { Upvote } from '@/types';
import { useSession } from 'next-auth/react';
import { createUpvoteAction, deleteUpvoteAction } from '@/app/actions/upvoteActions';

type UpvoteProps = {
  feedbackId: string;
  initialUpvoters: Upvote[];
  isRoadmap?: boolean;
};

const isInUpvotedList = (upvoters: Upvote[], userId: string | null): boolean => {
  if (!userId) {
    return false;
  }
  return upvoters.some((vote: Upvote) => vote.user_id === userId);
};

const UpvoteButton: React.FC<UpvoteProps> = ({
  feedbackId,
  initialUpvoters,
  isRoadmap = false,
}) => {
  const { data: session } = useSession();
  const userId = session?.user?.id || null;
  const isInitiallyUpvoted: boolean = isInUpvotedList(initialUpvoters, userId);
  const [isUpvoted, setIsUpvoted] = useState<boolean>(isInitiallyUpvoted);
  const [upvotesCount, setUpvotesCount] = useState<number>(initialUpvoters.length);

  const buttonDefaultStyles = isRoadmap
    ? 'lg:py-2.5'
    : 'md:pb-2 md:pt-3 md:max-w-10 md:order-first md:h-fit';
  const buttonUpvotedStyles = isUpvoted ? 'bg-blue-300 text-white' : 'bg-light-300 text-blue-300';
  const handleUpvote = async () => {
    if (userId) {
      setIsUpvoted(!isUpvoted);
      setUpvotesCount(isUpvoted ? upvotesCount - 1 : upvotesCount + 1);
      if (isUpvoted) {
        await deleteUpvoteAction(feedbackId, userId);
      } else {
        await createUpvoteAction(feedbackId, userId);
      }
    }
  };

  useEffect(() => {
    setIsUpvoted(isInUpvotedList(initialUpvoters, userId));
    setUpvotesCount(initialUpvoters.length);
  }, [initialUpvoters, userId]);

  return (
    <button
      onClick={() => handleUpvote()}
      aria-label={`Upvote feedback, current upvotes: ${upvotesCount}`}
      className={`w-fit rounded-lg px-4 py-1.5 font-semibold hover:bg-light-400 ${buttonDefaultStyles} ${buttonUpvotedStyles}`}
    >
      <span className={`flex items-center gap-x-2.5 gap-y-2 ${isRoadmap ? '' : 'md:flex-col'}`}>
        <Icons.ArrowUp />
        <strong className="text-sm md:ml-0">{upvotesCount}</strong>
      </span>
    </button>
  );
};

export default UpvoteButton;
