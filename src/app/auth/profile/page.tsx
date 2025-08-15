import { getUserByIdAction } from '@/app/actions/userActions';
import { auth } from '@/app/auth';
import { redirect, notFound } from 'next/navigation';
import { UserProfileProps } from '@/types';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/common';
import FormWrapper from '@/components/common/form/FormWrapper';
import ProfileEditForm from '@/components/forms/ProfileEditForm';
import ChangePasswordForm from '@/components/forms/ProfileChangePasswordForm';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Profile page title',
  description: 'Profile page description',
};

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/auth/signin');
  }

  const user: UserProfileProps | null = await getUserByIdAction(session.user.id);
  if (!user) {
    return notFound();
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <FormWrapper formName="Profile">
        <ProfileEditForm user={user} />
      </FormWrapper>
      <FormWrapper formName="Change Password">
        <ChangePasswordForm />
      </FormWrapper>
    </Suspense>
  );
}
