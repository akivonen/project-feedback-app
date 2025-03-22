'use client';
import { useFormik } from 'formik';
import { signInSchema } from '@/validation';
import LoadingSpinner from '../LoadingSpinner';
import Button from '../buttons/Button';
import { useRouter } from 'next/navigation';

const AuthForm = () => {
  const router = useRouter();
  const initialValues = {
    username: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const ErrorBorderStyles: Record<string, string> = {
    title:
      formik.touched.username && formik.errors.username
        ? 'border-orange-200'
        : 'border-transparent',
    description:
      formik.touched.password && formik.errors.password
        ? 'border-orange-200'
        : 'border-transparent',
  };

  if (formik.isSubmitting) {
    return <LoadingSpinner />;
  }

  return (
    <section className="relative mx-auto mb-[77px] mt-[30px] flex w-full flex-col justify-between rounded-lg bg-white p-6 text-dark-400 md:mb-[224px] md:mt-[144px] md:max-w-[540px] md:px-10 md:pb-10 md:pt-[52px]">
      <div className="absolute -top-5 h-10 w-10 md:-top-7 md:h-14 md:w-14">
        {/* {curFeedback ? (
          <Image width={56} height={56} src="/icons/icon-edit-feedback.svg" alt="Edit feedback" />
        ) : (
          <Image width={56} height={56} src="/icons/icon-new-feedback.svg" alt="New feedback" />
        )} */}
      </div>
      <h2 className="text-lg font-bold -tracking-[0.25px] text-dark-400 md:text-2xl md:-tracking-[-0.33px]">
        {/* {curFeedback ? `Editing ’${curFeedback.title}’` : 'Create New Feedback'} */}
        Sign In
      </h2>

      {/* {serverError && (
        <div className="mt-4 rounded-md text-sm text-orange-200 md:text-base" role="alert">
          {serverError}
        </div>
      )} */}

      <form onSubmit={formik.handleSubmit}>
        <div className="mt-6 md:mt-10">
          <label htmlFor="username">
            <h3 className="text-sm font-bold -tracking-[0.18px] text-dark-400 md:text-[14px] md:-tracking-[0.19px]">
              Username
            </h3>
          </label>
          <input
            type="text"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.password}
            className={`mt-4 w-full rounded-md border bg-light-200 p-4 text-sm text-dark-400 outline-none placeholder:text-sm placeholder:text-light-600 focus:border focus:border-blue-300 md:text-[15px] ${ErrorBorderStyles['title']}`}
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
            onChange={formik.handleChange}
            value={formik.values.password}
            className={`mt-4 w-full rounded-md border bg-light-200 p-4 text-sm text-dark-400 outline-none placeholder:text-sm placeholder:text-light-600 focus:border focus:border-blue-300 md:text-[15px] ${ErrorBorderStyles['title']}`}
            aria-invalid={formik.touched.password && !!formik.errors.password}
            aria-describedby={formik.errors.password ? 'password-error' : undefined}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-[14px] text-orange-200">{formik.errors.password}</div>
          )}
        </div>
        <div className="mt-10 flex flex-col gap-4 md:mt-8 md:flex-row-reverse">
          <Button type="submit" size="xl" variant="purple" disabled={formik.isSubmitting}>
            Login
          </Button>
          <Button type="button" size="xl" variant="dark-blue" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
