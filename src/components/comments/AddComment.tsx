'use client';
import React from 'react';
import { useFormik } from 'formik';
import Button from '../buttons/Button';
import { commentSchema } from '@/validation';
const AddComment = () => {
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: commentSchema,
    onSubmit: async ({ body }, { setSubmitting }) => {
      setSubmitting(true);
      try {
        console.log({ body });
        formik.resetForm();
      } catch (err) {
        console.log(err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const textareaErrorStyles =
    formik.touched.body && formik.errors.body ? 'border border-orange-100' : 'border-transparent';

  return (
    <div className="flex w-full flex-col rounded-lg bg-white p-6 md:px-8 md:py-7">
      <h2 className="text-lg font-bold -tracking-[0.25px] text-dark-400">Add Comment</h2>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="body"></label>
        <textarea
          id="body"
          className={`mt-6 w-full rounded-md border bg-light-200 p-4 text-sm text-dark-400 outline-none placeholder:text-sm placeholder:text-light-600 focus:border-blue-300 md:text-[15px] ${textareaErrorStyles}`}
          onChange={formik.handleChange}
          value={formik.values.body}
          onBlur={formik.handleBlur}
          maxLength={250}
          rows={2}
          placeholder="Type your comment here"
          aria-label="Type your comment here"
        />
        <div className="text-[14px] text-orange-100">
          {formik.touched.body && formik.errors.body}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-dark-200">{250 - formik.values.body.length || 0}</span>
          <Button variant="purple" size="lg" type="submit" disabled={formik.isSubmitting}>
            Post Comment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddComment;
