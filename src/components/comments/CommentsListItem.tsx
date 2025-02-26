'use client';
import React from 'react';
import { Comment } from '@/types';
import Image from 'next/image';
import ReplyItem from '../ReplyItem';

type CommentsListItemProps = {
  comment: Comment;
};

const CommentListItem: React.FC<CommentsListItemProps> = ({ comment }) => {
  const { user, content, replies } = comment;
  const reliesCount = replies.length;
  const commentWithRepliesStyles = 'md:border-l md:first:border-dark-200/10';

  return (
    <li className="flex flex-col text-dark-200">
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-x-4 md:gap-x-8">
          {user.image && (
            <Image
              className="rounded-full"
              src={user.image}
              alt={user.name}
              width="40"
              height="40"
            />
          )}
          <div className="flex flex-col text-sm md:text-[14px]">
            <span className="font-bold -tracking-[0.18px] text-dark-400">{user.name}</span>
            {`@${user.username}`}
          </div>
        </div>
        <button className="text-sm font-semibold text-blue-300">Reply</button>
      </div>
      <div>
        <p
          className={`mt-4 text-[15px] md:ml-5 md:pl-[52px] ${reliesCount > 0 && commentWithRepliesStyles}`}
        >
          {content}
        </p>
      </div>

      <ul className="">
        {replies && replies.map((reply) => <ReplyItem key={reply.id} reply={reply} />)}
      </ul>
    </li>
  );
};

export default CommentListItem;
