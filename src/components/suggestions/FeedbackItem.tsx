import React, { memo } from 'react';
import { Icons } from '../Icons';
import { Feedback } from '@/types';
import Link from 'next/link';
import RoadmapHomeWidgetItem from '../roadmap/RoadmapHomeWidgetItem';

type FeedbackItemProps = {
  feedback: Feedback;
  isLink?: boolean;
  isRoadmap?: boolean;
  roadmapColor?: string;
};

const FeedbackItem: React.FC<FeedbackItemProps> = ({
  feedback,
  isLink = false,
  isRoadmap = false,
  roadmapColor = 'orange-200',
}) => {
  const { title, category, upvotes, description, comments } = feedback;
  const repliesCount = comments.reduce((total, comment) => total + comment.replies.length, 0);
  const totalCommentsCount = comments.length + repliesCount;

  const commentsCountColor = totalCommentsCount > 0 ? 'text-dark-400' : 'text-light-500';
  const defaultContainerStyles = isRoadmap
    ? 'md:p-5 md:h-[250px]'
    : 'md:px-8 md:py-7 md:flex-nowrap';
  const buttonDefaultStyles = isRoadmap
    ? 'lg:py-2.5'
    : 'md:pb-2 md:pt-3 md:max-w-10 md:order-first md:h-fit';
  const roadmapContainerStyles = isRoadmap ? `border-t-[6px] border-t-${roadmapColor}` : '';
  const titleStyles = isRoadmap ? 'lg:text-lg' : 'md:text-lg';
  const descriptionStyles = isRoadmap ? 'lg:text-base' : 'md:text-base';
  const commentsStyles = isRoadmap ? 'lg:text-base' : 'md:text-base';
  const detailsStyles = `w-full gap-y-2 ${isRoadmap ? '' : 'md:ml-10 md:mr-6'}`;

  const details = (
    <>
      <h3 className={`text-sm font-bold text-dark-400 ${titleStyles}`}>{title}</h3>
      <p className={`mt-2 text-sm text-dark-200 md:mt-1 ${descriptionStyles}`}>{description}</p>
      <span className="mt-2 block w-fit rounded-lg bg-light-200 px-4 py-1.5 text-sm font-semibold text-blue-300 md:mt-3">
        {category}
      </span>
    </>
  );

  return (
    <div
      className={`flex w-full flex-wrap justify-between gap-y-4 rounded-lg bg-white p-6 ${defaultContainerStyles} ${roadmapContainerStyles}`}
    >
      {isRoadmap && <RoadmapHomeWidgetItem state={feedback.status} color={roadmapColor} />}
      {isLink ? (
        <Link href={`/feedbacks/${feedback.id}`} className={detailsStyles}>
          {details}
        </Link>
      ) : (
        <div className={detailsStyles}>{details}</div>
      )}

      <button
        aria-label={`Upvote feedback, current upvotes: ${upvotes}`}
        className={`w-fit rounded-lg bg-light-300 px-4 py-1.5 font-semibold text-blue-300 hover:bg-light-400 ${buttonDefaultStyles}`}
      >
        <span className={`flex items-center gap-x-2.5 gap-y-2 ${isRoadmap ? '' : 'md:flex-col'}`}>
          <Icons.ArrowUp />
          <strong className="text-sm text-dark-400 md:ml-0">{upvotes}</strong>
        </span>
      </button>
      <span
        className="flex items-center gap-x-1 md:gap-x-2"
        aria-label={`Comments: ${totalCommentsCount}`}
      >
        <Icons.Comments />
        <strong className={`text-sm ${commentsStyles} ${commentsCountColor}`}>
          {totalCommentsCount}
        </strong>
      </span>
    </div>
  );
};

export default memo(FeedbackItem);
