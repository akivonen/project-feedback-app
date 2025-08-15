'use client';

import React, { useState, useTransition } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { signUpSchema } from '@/app/validation';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { LoadingSpinner } from '../common';
import { Button } from '../buttons';
import { useRouter } from 'next/navigation';
import { signUpAction } from '@/app/actions/authActions';
import { toast } from 'react-toastify';
import ImagePicker from '../common/form/ImagePicker';
import FormWrapper from '../common/form/FormWrapper';
import FormInput from '../common/form/FormInput';
import { signIn } from 'next-auth/react';
import { UserSignUpFormData } from '@/types';

export default function SignUpForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const initialValues: UserSignUpFormData = {
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    image: null as File | null,
  };

  const onSubmit = async (
    user: UserSignUpFormData,
    { setValues }: FormikHelpers<UserSignUpFormData>
  ) => {
    setServerError(null);
    startTransition(async () => {
      try {
        await signUpAction(user);
        toast.success('Registration completed successfully.');
        await signIn('credentials', {
          username: user.username,
          password: user.password,
          redirect: false,
        });
        router.push('/');
        router.refresh();
      } catch (error) {
        setValues({ ...user, password: '', confirmPassword: '' });
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'An unexpected error occured in registration form';
        if (errorMessage !== 'Username is already taken. Please choose other username.') {
          console.error(errorMessage);
        }
        toast.error(errorMessage);
        setServerError(errorMessage);
      }
    });
  };

  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <FormWrapper formName="Sign Up" ariaLabelledBy="signup-form-heading">
      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(signUpSchema)}
        onSubmit={onSubmit}
      >
        {() => (
          <Form noValidate>
            {serverError && (
              <div
                className="mt-4 rounded-md text-sm text-orange-200 md:text-base"
                role="alert"
                aria-describedby={serverError ? 'server-error' : undefined}
              >
                {serverError}
              </div>
            )}
            <FormInput type="text" name="name" autoComplete="name" required></FormInput>
            <FormInput type="text" name="username" autoComplete="username" required></FormInput>
            <FormInput
              type="password"
              name="password"
              autoComplete="new-password"
              required
            ></FormInput>
            <FormInput
              type="confirmPassword"
              name="confirmPassword"
              autoComplete="new-password"
              required
            ></FormInput>
            <ImagePicker name="image" label="Add Profile Image(optional)" />
            <div className="mt-10 flex flex-col gap-4 md:mt-8 md:flex-row-reverse">
              <Button type="submit" size="xl" variant="purple" disabled={isPending}>
                Register
              </Button>
              <Button
                type="button"
                size="xl"
                variant="dark-blue"
                onClick={() => router.replace('/')}
              >
                Cancel
              </Button>
              <Button variant="blue" size="xl" href="/auth/signin">
                Login with existing account
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </FormWrapper>
  );
}
