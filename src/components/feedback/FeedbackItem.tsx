import React, { memo } from 'react';
import { Icons } from '../common/Icons';
import { Feedback, Comment } from '@/types';
import Link from 'next/link';
import RoadmapHomeWidgetItem from '../roadmap/RoadmapHomeWidgetItem';
import UpvoteButton from '../buttons/UpvoteButton';

type FeedbackItemSkeletonProps = {
  isRoadmap?: boolean;
  roadmapColor?: string;
};

type FeedbackItemProps = {
  feedback: Feedback;
  isLink?: boolean;
  isRoadmap?: boolean;
  roadmapColor?: string;
};

export const FeedbackItemSkeleton: React.FC<FeedbackItemSkeletonProps> = ({
  isRoadmap,
  roadmapColor,
}) => {
  return (
    <div
      data-testid="feedback-item-skeleton"
      className={`flex w-full animate-pulse flex-wrap justify-between gap-y-4 rounded-lg bg-white p-6 md:items-center md:gap-x-10 ${
        isRoadmap ? 'md:h-[250px] md:p-5' : 'md:flex-nowrap md:px-8 md:py-7'
      } ${isRoadmap ? `border-t-[6px] md:h-[250px] md:p-5 border-t-${roadmapColor}` : 'md:flex-nowrap md:px-8 md:py-7'}`}
    >
      <div className="w-full gap-y-2 md:mb-1">
        <div className="mt-2 h-5 w-3/4 rounded bg-light-200 md:mt-3"></div>
        <div className="mt-2 h-5 w-full rounded bg-light-200 md:mt-3"></div>
        <div className="mt-2 h-5 w-1/4 rounded-lg bg-light-200 md:mt-3"></div>
      </div>
      <div
        className={`h-8 w-16 rounded-lg bg-light-200 md:order-first md:self-start ${isRoadmap ? '' : 'md:h-14 md:w-14'}`}
      ></div>
      <div className="flex items-center gap-x-2">
        <div className="h-5 w-5 rounded-full bg-light-200"></div>
        <div className="h-4 w-6 rounded bg-light-200"></div>
      </div>
    </div>
  );
};

const FeedbackItem: React.FC<FeedbackItemProps> = ({
  feedback,
  isLink = false,
  isRoadmap = false,
  roadmapColor = 'orange-200',
}) => {
  const { title, category, description, comments } = feedback;
  const repliesCount = comments.reduce(
    (total: number, comment: Comment) => total + comment.replies.length,
    0
  );
  const totalCommentsCount = comments.length + repliesCount;

  const commentsCountColor = totalCommentsCount > 0 ? 'text-dark-400' : 'text-light-500';
  const defaultContainerStyles = isRoadmap
    ? 'md:p-5 md:h-[250px]'
    : 'md:px-8 md:py-7 md:flex-nowrap';
  const roadmapContainerStyles = isRoadmap ? `border-t-[6px] border-t-${roadmapColor}` : '';
  const titleStyles = isRoadmap ? 'lg:text-lg' : 'md:text-lg';
  const descriptionStyles = isRoadmap ? 'lg:text-base' : 'md:text-base';
  const commentsStyles = isRoadmap ? 'lg:text-base' : 'md:text-base';
  const detailsStyles = `w-full gap-y-2 ${isRoadmap ? '' : 'md:ml-10 md:mr-6'}`;

  const details = (
    <>
      <h3 className={`text-sm font-bold text-dark-400 ${titleStyles}`}>{title}</h3>
      <p
        className={`mt-2 text-sm text-dark-200 md:mt-1 ${descriptionStyles}`}
        aria-describedby={`feedback-${feedback.id}`}
      >
        {description}
      </p>
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

      <UpvoteButton feedbackId={feedback.id} upvoters={feedback.upvotes} isRoadmap={isRoadmap} />
      <span
        className="flex items-center gap-x-1 md:gap-x-2"
        aria-label={`Comments: ${totalCommentsCount}`}
      >
        <Icons.Comments data-testid="comments-icon" />
        <strong className={`text-sm ${commentsStyles} ${commentsCountColor}`}>
          {totalCommentsCount}
        </strong>
      </span>
    </div>
  );
};

export default memo(FeedbackItem);
