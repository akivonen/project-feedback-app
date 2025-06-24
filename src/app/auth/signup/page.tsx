import { LoadingSpinner } from '@/components/common';
import SignUpForm from '@/components/forms/SignUpForm';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Signup page title',
  description: 'Signup page description',
};

export default async function SignUpPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SignUpForm />
    </Suspense>
  );
}
