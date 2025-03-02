'use client';
import React from 'react';
import { useFormik } from 'formik';
import Button from '../buttons/Button';
import { commentSchema } from '@/validation';

type MessageFormProps = {
  isReplyForm?: boolean;
};

const MessageForm: React.FC<MessageFormProps> = ({ isReplyForm = false }) => {
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
  const replyFormStyles = isReplyForm
    ? 'mt-6 flex flex-col items-end gap-x-4 gap-y-4 md:flex-row md:items-start'
    : '';
  const textareaStyles = isReplyForm ? 'flex-1' : 'mt-6';
  const textareaErrorStyles =
    formik.touched.body && formik.errors.body ? 'border border-orange-100' : 'border-transparent';

  return (
    <form onSubmit={formik.handleSubmit} className={replyFormStyles}>
      <label htmlFor="body" className="sr-only">
        ${isReplyForm ? 'reply' : 'comment'}
      </label>
      <textarea
        id="body"
        className={`w-full rounded-md border bg-light-200 p-4 text-sm text-dark-400 outline-none placeholder:text-sm placeholder:text-light-600 focus:border-blue-300 md:text-[15px] ${textareaStyles} ${textareaErrorStyles}`}
        onChange={formik.handleChange}
        value={formik.values.body}
        onBlur={formik.handleBlur}
        maxLength={250}
        rows={2}
        placeholder={`Type your ${isReplyForm ? 'reply' : 'comment'} here`}
        aria-label={`Type your ${isReplyForm ? 'reply' : 'comment'} here`}
      />
      <div className="text-[14px] text-orange-100">{formik.touched.body && formik.errors.body}</div>
      <div className={`flex items-center justify-between ${isReplyForm ? '' : 'mt-4'}`}>
        {!isReplyForm && (
          <span className="text-sm text-dark-200">
            {250 - formik.values.body.length || 0} characters left
          </span>
        )}
        <Button variant="purple" size="lg" type="submit" disabled={formik.isSubmitting}>
          {`Post ${isReplyForm ? 'Reply' : 'Comment'}`}
        </Button>
      </div>
    </form>
  );
};

export default MessageForm;
