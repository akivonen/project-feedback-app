'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import { signUpSchema } from '@/app/validation';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { LoadingSpinner } from '../common';
import { Button } from '../buttons';
import { useRouter } from 'next/navigation';
import { signUpAction } from '@/app/actions/authActions';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import ImagePicker from '../common/ImagePicker';

export default function SignUpForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [hasProcessed, setHasProcessed] = useState<boolean>(false);
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
      formik.setSubmitting(true);
      try {
        await signUpAction(user);
        toast.success('Registration completed successfully.');
        formik.resetForm();
        setHasProcessed(true);
        await signIn('credentials', {
          username: user.username,
          password: user.password,
          redirect: true,
          callbackUrl: '/',
        });
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
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  const ErrorBorderStyles: Record<string, string> = {
    name: formik.touched.name && formik.errors.name ? 'border-orange-200' : 'border-transparent',
    username:
      formik.touched.username && formik.errors.username
        ? 'border-orange-200'
        : 'border-transparent',
    password:
      formik.touched.password && formik.errors.password
        ? 'border-orange-200'
        : 'border-transparent',
    confirmPassword:
      formik.touched.confirmPassword && formik.errors.confirmPassword
        ? 'border-orange-200'
        : 'border-transparent',
    image: formik.touched.image && formik.errors.image ? 'border-orange-200' : 'border-transparent',
  };

  if (formik.isSubmitting || hasProcessed) {
    return <LoadingSpinner />;
  }

  return (
    <section className="relative mx-auto mb-[77px] mt-[30px] flex w-full flex-col justify-between rounded-lg bg-white p-6 text-dark-400 md:mb-[224px] md:mt-[144px] md:max-w-[540px] md:px-10 md:pb-10 md:pt-[52px]">
      <h2 className="text-lg font-bold -tracking-[0.25px] text-dark-400 md:text-2xl md:-tracking-[-0.33px]">
        Sign Up
      </h2>
      {serverError && (
        <div className="mt-4 rounded-md text-sm text-orange-200 md:text-base" role="alert">
          {serverError}
        </div>
      )}

      <form onSubmit={formik.handleSubmit}>
        <div className="mt-6 md:mt-10">
          <label htmlFor="name">
            <h3 className="text-sm font-bold -tracking-[0.18px] text-dark-400 md:text-[14px] md:-tracking-[0.19px]">
              Name
            </h3>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className={`mt-4 w-full rounded-md border bg-light-200 p-4 text-sm text-dark-400 outline-none placeholder:text-sm placeholder:text-light-600 focus:border focus:border-blue-300 md:text-[15px] ${ErrorBorderStyles['name']}`}
            aria-invalid={formik.touched.name && !!formik.errors.name}
            aria-describedby={formik.errors.name ? 'name-error' : undefined}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-[14px] text-orange-200">{formik.errors.name}</div>
          )}
        </div>
        <div className="mt-6 md:mt-10">
          <label htmlFor="username">
            <h3 className="text-sm font-bold -tracking-[0.18px] text-dark-400 md:text-[14px] md:-tracking-[0.19px]">
              Username
            </h3>
          </label>
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            className={`mt-4 w-full rounded-md border bg-light-200 p-4 text-sm text-dark-400 outline-none placeholder:text-sm placeholder:text-light-600 focus:border focus:border-blue-300 md:text-[15px] ${ErrorBorderStyles['username']}`}
            aria-invalid={formik.touched.username && !!formik.errors.username}
            aria-describedby={formik.errors.username ? 'username-error' : undefined}
          />
          {formik.touched.username && formik.errors.username && (
            <div className="text-[14px] text-orange-200">{formik.errors.username}</div>
          )}
        </div>
        <div className="mt-6 md:mt-10">
          <label htmlFor="password">
            <h3 className="text-sm font-bold -tracking-[0.18px] text-dark-400 md:text-[14px] md:-tracking-[0.19px]">
              Password
            </h3>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="new-password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className={`mt-4 w-full rounded-md border bg-light-200 p-4 text-sm text-dark-400 outline-none placeholder:text-sm placeholder:text-light-600 focus:border focus:border-blue-300 md:text-[15px] ${ErrorBorderStyles['password']}`}
            aria-invalid={formik.touched.password && !!formik.errors.password}
            aria-describedby={formik.errors.password ? 'password-error' : undefined}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-[14px] text-orange-200">{formik.errors.password}</div>
          )}
        </div>
        <div className="mt-6 md:mt-10">
          <label htmlFor="confirmPassword">
            <h3 className="text-sm font-bold -tracking-[0.18px] text-dark-400 md:text-[14px] md:-tracking-[0.19px]">
              Confirm Password
            </h3>
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            autoComplete="new-password"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            className={`mt-4 w-full rounded-md border bg-light-200 p-4 text-sm text-dark-400 outline-none placeholder:text-sm placeholder:text-light-600 focus:border focus:border-blue-300 md:text-[15px] ${ErrorBorderStyles['confirmPassword']}`}
            aria-invalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
            aria-describedby={formik.errors.confirmPassword ? 'password-error' : undefined}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-[14px] text-orange-200">{formik.errors.confirmPassword}</div>
          )}
        </div>
        <ImagePicker
          name="image"
          label="Add image (optional)"
          setFieldValue={formik.setFieldValue}
          isTouched={formik.touched.image}
          errors={formik.errors.image}
        />
        <div className="mt-10 flex flex-col gap-4 md:mt-8 md:flex-row-reverse">
          <Button type="submit" size="xl" variant="purple" disabled={formik.isSubmitting}>
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
    </section>
  );
}
