import React from 'react';
import { Comment } from '@/types';
import CommentListItem from './CommentsListItem';

type CommentsListProps = {
  comments: Comment[];
};

const CommentList: React.FC<CommentsListProps> = ({ comments }) => {
  return (
    <section
      id="comments"
      className="flex w-full flex-wrap justify-between gap-y-4 rounded-lg bg-white p-6 md:flex-nowrap md:px-8 md:py-7"
    >
      <h2>{`${comments.length | 0} Comments`}</h2>
      <ul className="mt-6">
        {comments &&
          comments.map((comment) => <CommentListItem key={comment.id} comment={comment} />)}
      </ul>
    </section>
  );
};

export default CommentList;
