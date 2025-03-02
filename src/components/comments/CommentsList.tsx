import React from 'react';
import { Comment } from '@/types';
import Message from './Message';

type CommentsListProps = {
  comments: Comment[];
};

const CommentList: React.FC<CommentsListProps> = ({ comments }) => {
  return (
    <section className="flex w-full flex-col justify-between gap-y-4 rounded-lg bg-white p-6 md:px-8 md:py-7">
      <h2 className="text-lg font-bold -tracking-[0.25px] text-dark-400">{`${comments.length | 0} Comments`}</h2>
      <ul className="mt-6 flex flex-col md:mt-7">
        {comments &&
          comments.map((comment, index) => (
            <React.Fragment key={comment.id}>
              <Message item={comment} />
              {index < comments.length - 1 && (
                <hr className="my-6 border-t text-light-600/25 md:my-8" />
              )}
            </React.Fragment>
          ))}
      </ul>
    </section>
  );
};

export default CommentList;
