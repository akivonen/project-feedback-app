'use client';
import React from 'react';
import { signOut } from 'next-auth/react';

export default function SignOut() {
  return <button onClick={() => signOut()}>Sign Out</button>;
}
