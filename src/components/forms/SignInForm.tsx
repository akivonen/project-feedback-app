'use client';
import React, { useState, useTransition } from 'react';
import { useFormik } from 'formik';
import { signInSchema } from '@/app/validation';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { LoadingSpinner } from '../common';
import { Button } from '../buttons';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import FormInput from '../common/FormInput';
import FormWrapper from '../common/FormWrapper';

export default function SignInForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const initialValues = {
    username: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(signInSchema),
    onSubmit: async ({ username, password }) => {
      setServerError(null);
      startTransition(async () => {
        try {
          const result = await signIn('credentials', {
            username,
            password,
            redirect: false,
          });
          if (result?.error) {
            const errorMessage =
              result?.error === 'CredentialsSignin'
                ? 'Login or password is incorrect'
                : 'An unexpected error occurred during sign-in';

            toast.error(errorMessage);
            setServerError(errorMessage);
            formik.resetForm({ values: { username: '', password: '' } });
            return;
          }
          toast.success('You`ve successfully logged in');
          router.push('/');
          router.refresh();
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'An unexpected error occured';
          toast.error(errorMessage);
          setServerError(errorMessage);
        }
      });
    },
  });

  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <FormWrapper formName="Sign In">
      <form onSubmit={formik.handleSubmit} noValidate>
        {serverError && (
          <div
            id="server-error"
            className="mt-4 rounded-md text-sm text-orange-200 md:text-base"
            role="alert"
            aria-describedby={serverError ? 'server-error' : undefined}
          >
            {serverError}
          </div>
        )}
        <FormInput
          type="text"
          fieldName="username"
          autoComplete="username"
          required
          onChange={formik.handleChange}
          isTouched={formik.touched.username}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          errors={formik.errors.username}
        />
        <FormInput
          type="password"
          fieldName="password"
          autoComplete="current-password"
          required
          onChange={formik.handleChange}
          isTouched={formik.touched.password}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          errors={formik.errors.password}
        />
        <div className="mt-10 flex flex-col gap-4 md:mt-8 md:flex-row-reverse">
          <Button type="submit" size="xl" variant="purple" disabled={isPending}>
            Login
          </Button>
          <Button type="button" size="xl" variant="dark-blue" onClick={() => router.replace('/')}>
            Cancel
          </Button>
          <Button variant="blue" size="xl" href="/auth/signup" disabled={isPending}>
            Create an account
          </Button>
        </div>
      </form>
    </FormWrapper>
  );
}
