import { LoadingSpinner } from '@/components/common';
import SignUpForm from '@/components/forms/SignUpForm';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function SignUpPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SignUpForm />
    </Suspense>
  );
}
