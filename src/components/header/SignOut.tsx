'use client';
import React from 'react';
import { signOut } from 'next-auth/react';
import { Icons } from '../Icons';

export default function SignOut() {
  return (
    <button onClick={() => signOut()}>
      <Icons.Logout />
    </button>
  );
}
