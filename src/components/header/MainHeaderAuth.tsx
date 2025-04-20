'use client';
import React from 'react';
import Link from 'next/link';
import { Icons } from '../common';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { LoadingSpinner } from '../common';

export default function MainHeaderAuth() {
  const { data: session, status } = useSession();

  return (
    <div className="flex items-end">
      {status === 'loading' ? (
        <LoadingSpinner />
      ) : session ? (
        <button onClick={() => signOut()}>
          <Icons.Logout />
        </button>
      ) : (
        <Link href="/auth/signin">
          <Icons.Login />
        </Link>
      )}
    </div>
  );
}
