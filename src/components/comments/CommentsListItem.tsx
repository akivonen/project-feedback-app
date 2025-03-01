'use client';
import React, { useState } from 'react';
import { Comment } from '@/types';
import Image from 'next/image';
import ReplyItem from './ReplyItem';
import Button from '../buttons/Button';

type CommentsListItemProps = {
  comment: Comment;
};

const CommentListItem: React.FC<CommentsListItemProps> = ({ comment }) => {
  const { user, content, replies } = comment;
  const reliesCount = replies.length;
  const commentWithRepliesStyles = 'md:border-l md:border-dark-200/10';
  const [toggleReplyForm, setToggleReplyForm] = useState(false);

  return (
    <li className="flex flex-col">
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-x-4 md:gap-x-8">
          {user.image && (
            <Image
              className="h-auto w-[40px] rounded-full"
              src={user.image}
              alt={user.name}
              width={80}
              height={80}
              sizes="50px"
            />
          )}
          <div className="flex flex-col text-sm md:text-[14px]">
            <span className="font-bold -tracking-[0.18px] text-dark-400">{user.name}</span>
            <span className="text-dark-200">{`@${user.username}`}</span>
          </div>
        </div>
        <button
          onClick={() => setToggleReplyForm(!toggleReplyForm)}
          type="button"
          className="text-sm font-semibold text-blue-300 hover:underline hover:decoration-solid"
        >
          Reply
        </button>
      </div>
      <div
        className={`mt-4 flex flex-col gap-x-6 text-[15px] md:ml-5 md:pl-[52px] ${reliesCount > 0 && commentWithRepliesStyles}`}
      >
        <p className="text-dark-200">{content}</p>
        {toggleReplyForm && (
          <form className="mt-6 flex flex-col items-end gap-x-4 gap-y-4 md:flex-row md:items-start">
            <label htmlFor="reply" className="sr-only">
              Reply
            </label>

            <textarea
              name="reply"
              id="reply"
              className="w-full rounded-md border-0 bg-light-200 p-4 text-sm text-dark-400 outline-none placeholder:text-light-600 focus:border focus:border-solid focus:border-blue-300 md:flex-1 md:text-[15px]"
              placeholder="Type your reply here"
              aria-label="Type your reply here"
            />
            <Button variant="purple" size="lg">
              Post Reply
            </Button>
          </form>
        )}
      </div>

      <ul className="">
        {replies && replies.map((reply) => <ReplyItem key={reply.id} reply={reply} />)}
      </ul>
    </li>
  );
};

export default CommentListItem;
