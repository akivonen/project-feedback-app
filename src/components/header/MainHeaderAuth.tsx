'use client';
import React from 'react';
import Link from 'next/link';
import { Icons } from '@/components/Icons';
import SignOut from '@/components/header/SignOut';
import { useSession } from 'next-auth/react';
import LoadingSpinner from '../LoadingSpinner';

export default function MainHeaderAuth() {
  const { data: session, status } = useSession();

  return (
    <div className='flex items-end'>
      {status === 'loading' ? (
        <LoadingSpinner />
      ) : session ? (
        <SignOut />
      ) : (
        <Link href="/auth/signin">
          <Icons.Login />
        </Link>
      )}
    </div>
  );
}
