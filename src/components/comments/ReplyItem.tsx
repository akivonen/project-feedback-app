'use client';
import React from 'react';
import { Reply } from '@/types';
import Image from 'next/image';

type ReplyProps = {
  reply: Reply;
};

const ReplyItem: React.FC<ReplyProps> = ({ reply }) => {
  const { user, content, replying_to } = reply;
  return (
    <li className="mt-6 pl-[23px] text-dark-200 first:border-l first:border-dark-200/10 md:ml-5 md:mt-0 md:pt-8">
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
            {`@${user.username}`}
          </div>
        </div>
        <button className="text-sm font-semibold text-blue-300">Reply</button>
      </div>
      <p className="mt-4 text-[15px] md:pl-[72px]">
        <span className="font-bold text-purple-200">{`@${replying_to}`}</span>
        &nbsp;&nbsp;{content}
      </p>
    </li>
  );
};

export default ReplyItem;
