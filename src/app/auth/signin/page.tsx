import { LoadingSpinner } from '@/components/common';
import SignInForm from '@/components/forms/SignInForm';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function SignInPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SignInForm />
    </Suspense>
  );
}
