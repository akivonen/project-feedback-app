'use client';

import React, { useState, useTransition } from 'react';
import { Form, Formik } from 'formik';
import { changePasswordClientSchema } from '@/app/validation';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { LoadingSpinner } from '../common';
import { Button } from '../buttons';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { changeUserPasswordAction } from '@/app/actions/userActions';
import FormInput from '../common/form/FormInput';
import { ChangeUserPasswordProps } from '@/types';

export default function ProfileChangePasswordForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { data: session, status } = useSession();
  const router = useRouter();

  if (!session?.user?.id && status !== 'loading') {
    router.push('/auth/signin');
  }

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const onSubmit = async (user: Omit<ChangeUserPasswordProps, 'id'>) => {
    setServerError(null);
    startTransition(async () => {
      try {
        if (session?.user?.id) {
          await changeUserPasswordAction({ ...user, id: session.user.id });
          toast.success('Password changed successfully');
          router.refresh();
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'An unexpected error occured in password change form';
        if (errorMessage !== 'Current password is incorrect') {
          console.error(errorMessage);
        }
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
      validationSchema={toFormikValidationSchema(changePasswordClientSchema)}
      onSubmit={onSubmit}
    >
      {() => (
        <Form noValidate>
          {serverError && (
            <div
              className="mt-4 rounded-md text-sm text-orange-200 md:text-base"
              role="alert"
              id="server-error"
            >
              {serverError}
            </div>
          )}
          <FormInput type="password" autoComplete="current-password" name="old password" />
          <FormInput type="password" autoComplete="current-password" name="new password" />
          <FormInput type="password" autoComplete="new-password" name="confirm password" />
          <div className="mt-10 flex flex-col gap-4 md:mt-8 md:flex-row-reverse">
            <Button type="submit" size="xl" variant="purple" disabled={isPending}>
              Change Password
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
