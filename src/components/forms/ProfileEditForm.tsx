'use client';

import React, { useState, useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { Form, Formik } from 'formik';
import { profileUpdateClientSchema } from '@/app/validation';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { LoadingSpinner } from '../common';
import { Button } from '../buttons';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import ImagePicker from '../common/form/ImagePicker';
import { UserProfileProps } from '@/types';
import { updateUserProfileAction } from '@/app/actions/userActions';
import FormInput from '../common/form/FormInput';
import { UpdateUserProfileActionProps } from '@/types/user';

export default function ProfileEditForm({ user }: { user: UserProfileProps }) {
  const { name, username, image } = user;
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { data: session, status } = useSession();
  const router = useRouter();

  if (!session?.user && status !== 'loading') {
    router.push('/auth/signin');
  }

  const initialValues = {
    name: name,
    username: username,
    image: null,
  };

  const onSubmit = async (updatedUser: Omit<UpdateUserProfileActionProps, 'id'>) => {
    setServerError(null);
    startTransition(async () => {
      try {
        await updateUserProfileAction({ ...updatedUser, id: user.id });
        toast.success('Profile updated successfully!');
        router.refresh();
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'An unexpected error occured in registration form';
        toast.error(errorMessage);
        setServerError(errorMessage);
      }
    });
  };

  if (status === 'loading' || isPending) {
    return <LoadingSpinner />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(profileUpdateClientSchema)}
      onSubmit={onSubmit}
    >
      {() => (
        <Form noValidate>
          {serverError && (
            <div
              className="mt-4 rounded-md text-sm text-orange-200 md:text-base"
              role="alert"
              id="server-error"
              aria-describedby={serverError ? 'server-error' : undefined}
            >
              {serverError}
            </div>
          )}
          <FormInput type="text" disabled name="username" aria-disabled="true" />
          <FormInput type="text" autoComplete="name" name="name" />
          <ImagePicker name="image" label="Change Profile Image" imagePath={image} />
          <div className="mt-10 flex flex-col gap-4 md:mt-8 md:flex-row-reverse">
            <Button type="submit" size="xl" variant="purple" disabled={isPending}>
              Submit
            </Button>
            <Button type="button" size="xl" variant="dark-blue" onClick={() => router.replace('/')}>
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
