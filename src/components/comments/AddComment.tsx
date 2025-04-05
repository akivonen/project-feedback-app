'use client';
import React from 'react';
import MessageForm from '../forms/MessageForm';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function AddComment() {
  const { data: session } = useSession();
  if (!session?.user?.id) {
    return (
      <div className="flex w-full justify-center rounded-lg bg-white p-6 md:px-8 md:py-7">
        <h2 className="text-lg -tracking-[0.25px] text-dark-400">
          Please{' '}
          <Link href="/auth/signin" className="font-bold hover:underline">
            sign in
          </Link>{' '}
          to add comment.
        </h2>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col rounded-lg bg-white p-6 md:px-8 md:py-7">
      <h2 className="text-lg font-bold -tracking-[0.25px] text-dark-400">Add Comment</h2>
      <MessageForm user_id={session.user.id} />
    </div>
  );
}
