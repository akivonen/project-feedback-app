import React from 'react';
import { Comment } from '@/types';
import Message, { MessageSkeleton } from './Message';

type CommentsListProps = {
  comments: Comment[];
};

export function CommentListSkeleton() {
  return (
    <section className="flex w-full animate-pulse flex-col gap-y-4 rounded-lg bg-white p-6 md:px-8 md:py-7">
      <div className="h-5 w-1/5 bg-light-200"></div>
      <ul className="mt-6 md:mt-7">
        <li>
          <MessageSkeleton />
        </li>
      </ul>
    </section>
  );
}

const CommentList: React.FC<CommentsListProps> = async ({ comments }) => {
  return (
    <section
      className="flex w-full flex-col gap-y-4 rounded-lg bg-white p-6 md:px-8 md:py-7"
      aria-label="Feedback comments"
    >
      <h2 className="text-lg font-bold -tracking-[0.25px] text-dark-400">{`${comments.length} Comments`}</h2>
      <ul className="mt-6 flex flex-col md:mt-7">
        {comments.map((comment, index) => (
          <React.Fragment key={comment.id}>
            <Message item={comment} />
            {index < comments.length - 1 && (
              <hr className="my-6 border-t border-light-600/25 md:my-8" />
            )}
          </React.Fragment>
        ))}
      </ul>
    </section>
  );
};

export default CommentList;
