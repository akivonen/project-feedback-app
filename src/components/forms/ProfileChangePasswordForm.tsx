'use client';

import React, { useState, useTransition } from 'react';
import { useFormik } from 'formik';
import { changePasswordClientSchema } from '@/app/validation';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { LoadingSpinner } from '../common';
import { Button } from '../buttons';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { changeUserPasswordAction } from '@/app/actions/userActions';
import FormInput from '../common/FormInput';

export default function ProfileChangePasswordForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { data: session, status } = useSession();
  const router = useRouter();

  if (!session?.user?.id && status !== 'loading') {
    router.push('/auth/signin');
  }

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: toFormikValidationSchema(changePasswordClientSchema),
    onSubmit: async (user) => {
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
    },
  });

  if (status === 'loading' || isPending) {
    return <LoadingSpinner />;
  }

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      {serverError && (
        <div
          className="mt-4 rounded-md text-sm text-orange-200 md:text-base"
          role="alert"
          id="server-error"
        >
          {serverError}
        </div>
      )}
      <FormInput
        type="password"
        autoComplete="current-password"
        fieldName="old password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.oldPassword}
        isTouched={formik.touched.oldPassword}
        errors={formik.errors.oldPassword}
      />
      <FormInput
        type="password"
        autoComplete="current-password"
        fieldName="new password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.newPassword}
        isTouched={formik.touched.newPassword}
        errors={formik.errors.newPassword}
      />
      <FormInput
        type="password"
        autoComplete="new-password"
        fieldName="confirm password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.confirmPassword}
        isTouched={formik.touched.confirmPassword}
        errors={formik.errors.confirmPassword}
      />
      <div className="mt-10 flex flex-col gap-4 md:mt-8 md:flex-row-reverse">
        <Button type="submit" size="xl" variant="purple" disabled={isPending}>
          Change Password
        </Button>
        <Button type="button" size="xl" variant="dark-blue" onClick={() => router.replace('/')}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
