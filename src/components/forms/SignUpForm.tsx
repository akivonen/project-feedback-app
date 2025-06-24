'use client';

import React, { useState, useTransition } from 'react';
import { useFormik } from 'formik';
import { signUpSchema } from '@/app/validation';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { LoadingSpinner } from '../common';
import { Button } from '../buttons';
import { useRouter } from 'next/navigation';
import { signUpAction } from '@/app/actions/authActions';
import { toast } from 'react-toastify';
import ImagePicker from '../common/ImagePicker';
import FormWrapper from '../common/FormWrapper';
import FormInput from '../common/FormInput';
import { signIn } from 'next-auth/react';

export default function SignUpForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const initialValues = {
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    image: null,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(signUpSchema),
    onSubmit: async (user) => {
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
          formik.values.password = '';
          formik.values.confirmPassword = '';
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
    },
  });

  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <FormWrapper formName="Sign Up" ariaLabelledBy="signup-form-heading">
      <form onSubmit={formik.handleSubmit} noValidate>
        {serverError && (
          <div
            className="mt-4 rounded-md text-sm text-orange-200 md:text-base"
            role="alert"
            aria-describedby={serverError ? 'server-error' : undefined}
          >
            {serverError}
          </div>
        )}
        <FormInput
          type="text"
          fieldName="name"
          autoComplete="name"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          isTouched={formik.touched.name}
          errors={formik.errors.name}
        ></FormInput>
        <FormInput
          type="text"
          fieldName="username"
          autoComplete="username"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          isTouched={formik.touched.username}
          errors={formik.errors.username}
        ></FormInput>
        <FormInput
          type="password"
          fieldName="password"
          autoComplete="new-password"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          isTouched={formik.touched.password}
          errors={formik.errors.password}
        ></FormInput>
        <FormInput
          type="confirmPassword"
          fieldName="confirmPassword"
          autoComplete="new-password"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          isTouched={formik.touched.confirmPassword}
          errors={formik.errors.confirmPassword}
        ></FormInput>
        <ImagePicker
          name="image"
          label="Add Profile Image(optional)"
          setFieldValue={formik.setFieldValue}
          isTouched={formik.touched.image}
          errors={formik.errors.image}
        />
        <div className="mt-10 flex flex-col gap-4 md:mt-8 md:flex-row-reverse">
          <Button type="submit" size="xl" variant="purple" disabled={isPending}>
            Register
          </Button>
          <Button type="button" size="xl" variant="dark-blue" onClick={() => router.replace('/')}>
            Cancel
          </Button>
          <Button variant="blue" size="xl" href="/auth/signin">
            Login with existing account
          </Button>
        </div>
      </form>
    </FormWrapper>
  );
}
