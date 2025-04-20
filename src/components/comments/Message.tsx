'use client';
import React, { useState, memo } from 'react';
import { Comment, Reply } from '@/types';
import Image from 'next/image';
import MessageForm from '../forms/MessageForm';
import { useSession } from 'next-auth/react';

type MessageProps = {
  item: Comment | Reply;
  isReply?: boolean;
};

export function MessageSkeleton() {
  return (
    <div className="flex animate-pulse flex-col">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-x-4 md:gap-x-8">
          <div className="h-10 w-10 rounded-full bg-light-200"></div>
          <div className="flex flex-col gap-y-1">
            <div className="h-5 w-40 bg-light-200"></div>
            <div className="h-5 w-40 bg-light-200"></div>
          </div>
        </div>
      </div>
      <div className="md:ml-5 md:pl-[52px]">
        <div className="mt-4 h-20 w-full bg-light-200"></div>
      </div>
    </div>
  );
}

const isReplyItem = (item: Comment | Reply): item is Reply => 'replying_to' in item;

const Message: React.FC<MessageProps> = ({ item, isReply = false }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { user, content } = item;
  const replying_to = isReplyItem(item) ? item.replying_to : user.username;
  const replies = 'replies' in item ? item.replies : [];
  const commentId = isReplyItem(item) ? item.comment_id : item.id;

  const containerStyles = isReply
    ? 'mt-6 pl-6 text-dark-200 first:border-l first:border-dark-200/10 md:ml-5 md:mt-0 md:pt-8'
    : 'flex flex-col';
  const contentStyles = isReply
    ? 'mt-4 text-[15px] md:pl-[72px]'
    : 'mt-4 flex flex-col gap-x-6 text-[15px] md:ml-5 md:pl-[52px]';
  const borderStyles = !isReply && replies.length > 0 ? 'md:border-l md:border-dark-200/10' : '';

  const [showReplyForm, setShowReplyForm] = useState(false);

  return (
    <li className={containerStyles} aria-label={`${isReply ? 'Reply' : 'Comment'} by ${user.name}`}>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-x-4 md:gap-x-8">
          {user.image ? (
            <Image
              className="rounded-full"
              src={user.image}
              alt={`${user.name}'s profile picture`}
              width={40}
              height={40}
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-light-200">
              <span className="text-2xl font-semibold text-blue-300">
                {user.username[0].toUpperCase()}
              </span>
            </div>
          )}
          <div className="flex flex-col text-sm md:text-[14px]">
            <span className="font-bold -tracking-[0.18px] text-dark-400">{user.name}</span>
            <span className="text-dark-200">{`@${user.username}`}</span>
          </div>
        </div>
        {userId && (
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            type="button"
            className="text-sm font-semibold text-blue-300 hover:underline hover:decoration-solid"
            aria-expanded={showReplyForm}
            aria-controls={`reply-form-${item.id}`}
          >
            Reply
          </button>
        )}
      </div>
      <div className={`${contentStyles} ${borderStyles}`}>
        <p className="text-dark-200">
          {isReply && <span className="font-bold text-purple-200">{`@${replying_to}`}</span>}
          {isReply ? `  ${content}` : content}
        </p>
        {showReplyForm && userId && (
          <MessageForm
            isReplyForm
            id={item.id}
            replyingTo={replying_to}
            commentId={commentId}
            user_id={userId}
          />
        )}
      </div>
      {!isReply && replies.length > 0 && (
        <ul className="">
          {replies.map((item) => (
            <Message key={item.id} item={item} isReply />
          ))}
        </ul>
      )}
    </li>
  );
};

export default memo(Message);
