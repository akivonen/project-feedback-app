import { LoadingSpinner } from '@/components/common';
import SignInForm from '@/components/forms/SignInForm';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Signin page title',
  description: 'Signin page description',
};

export default async function SignInPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SignInForm />
    </Suspense>
  );
}
