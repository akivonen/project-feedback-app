'use client';
import React, { useState } from 'react';
import { Comment, Reply } from '@/types';
import Image from 'next/image';
import Button from '../buttons/Button';

type MessageProps = {
  item: Comment | Reply;
  isReply?: boolean;
};

const Message: React.FC<MessageProps> = ({ item, isReply = false }) => {
  const { user, content } = item;
  const replying_to = 'replying_to' in item ? item.replying_to : undefined;
  const replies = 'replies' in item ? item.replies : [];

  const containerStyles = isReply
    ? 'mt-6 pl-[23px] text-dark-200 first:border-l first:border-dark-200/10 md:ml-5 md:mt-0 md:pt-8'
    : 'flex flex-col';
  const contentStyles = isReply
    ? 'mt-4 text-[15px] md:pl-[72px]'
    : 'mt-4 flex flex-col gap-x-6 text-[15px] md:ml-5 md:pl-[52px]';
  const borderStyles = !isReply && replies.length > 0 ? 'md:border-l md:border-dark-200/10' : '';

  const [toggleReplyForm, setToggleReplyForm] = useState(false);

  return (
    <li className={containerStyles}>
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
      <div className={`${contentStyles} ${borderStyles}`}>
        <p className="text-dark-200">
          {isReply && <span className="font-bold text-purple-200">{`@${replying_to}`}</span>}
          {isReply ? `  ${content}` : content}
        </p>
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
      {!isReply && replies.length > 0 && (
        <ul className="">
          {replies && replies.map((item) => <Message key={item.id} item={item} isReply={true} />)}
        </ul>
      )}
    </li>
  );
};

export default Message;
