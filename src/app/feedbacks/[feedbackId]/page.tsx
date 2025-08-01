import { getFeedbackByIdAction } from '@/app/actions/feedbackActions';
import { FeedbackItem } from '@/components/suggestions/index';
import { CommentList, CommentListSkeleton, AddComment } from '@/components/comments/';
import { notFound } from 'next/navigation';
import {
  FeedbackHeader,
  FeedbackHeaderSkeleton,
  FeedbackItemSkeleton,
} from '@/components/feedback/';
import { Metadata } from 'next';

type FeedbackDetailsPageProps = {
  params: Promise<{ feedbackId: string }>;
};

export async function generateMetadata({ params }: FeedbackDetailsPageProps): Promise<Metadata> {
  const { feedbackId } = await params;
  const feedback = await getFeedbackByIdAction(feedbackId);

  return {
    title: `${feedback?.title} - Feedback Details Page`,
    description: `${feedback?.description}`,
  };
}

export const FeedbackDetailsPageSkeleton = () => {
  return (
    <>
      <FeedbackHeaderSkeleton />
      <main className="flex flex-col gap-y-6">
        <FeedbackItemSkeleton />
        <CommentListSkeleton />
      </main>
    </>
  );
};

export default async function FeedbackDetailsPage({ params }: FeedbackDetailsPageProps) {
  const { feedbackId } = await params;

  const feedback = await getFeedbackByIdAction(feedbackId);

  if (!feedback) {
    notFound();
  }

  return (
    <>
      <FeedbackHeader feedback={feedback} />
      <main className="flex flex-col gap-y-6">
        <FeedbackItem feedback={feedback} />
        {feedback.comments && <CommentList comments={feedback.comments} />}
        <AddComment />
      </main>
    </>
  );
}
