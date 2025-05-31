'use client';
import React, { memo } from 'react';
import { useFormik } from 'formik';
import Button from '../buttons/Button';
import { commentSchema } from '@/validation';
import { useParams } from 'next/navigation';
import { createCommentAction } from '@/app/actions/commentActions';
import { createReplyAction } from '@/app/actions/replyActions';
import { toast } from 'react-toastify';

type MessageFormProps = {
  id?: string;
  isReplyForm?: boolean;
  commentId?: string;
  replyingTo?: string;
  user_id: string;
};

function MessageForm({
  id,
  isReplyForm = false,
  replyingTo,
  commentId,
  user_id,
}: MessageFormProps) {
  const { feedbackId } = useParams();
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: commentSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async ({ body }, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        if (isReplyForm && commentId && replyingTo) {
          await createReplyAction({
            comment_id: commentId,
            replying_to: replyingTo,
            content: body,
            user_id,
          });
          resetForm();
          toast.success('Reply posted');
        } else if (typeof feedbackId !== 'string') {
          throw new Error('Invalid feedback_id');
        } else {
          await createCommentAction({ feedback_id: feedbackId, content: body, user_id });
          resetForm();
          toast.success('Comment posted');
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error('Unknown error occurred');
          console.error(error);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });
  const replyFormStyles = isReplyForm
    ? 'mt-6 flex flex-col items-end gap-4 md:flex-row md:items-start'
    : '';
  const textareaStyles = isReplyForm ? 'flex-1' : 'mt-6';
  const textareaErrorStyles =
    formik.touched.body && formik.errors.body ? 'border-orange-200' : 'border-transparent';

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={replyFormStyles}
      id={id}
      aria-label={isReplyForm ? 'Reply form' : 'Comment form'}
    >
      <label htmlFor="body" className="sr-only">
        {isReplyForm ? 'reply' : 'comment'}
      </label>
      <textarea
        name="body"
        id="body"
        autoComplete="off"
        className={`w-full rounded-md border bg-light-200 p-4 text-sm text-dark-400 outline-none placeholder:text-sm placeholder:text-light-600 focus:border-blue-300 md:text-[15px] ${textareaStyles} ${textareaErrorStyles}`}
        onChange={formik.handleChange}
        value={formik.values.body}
        onBlur={formik.handleBlur}
        maxLength={250}
        rows={2}
        placeholder={`Type your ${isReplyForm ? 'reply' : 'comment'} here`}
        aria-label={`Type your ${isReplyForm ? 'reply' : 'comment'} here`}
        aria-describedby={formik.touched.body && formik.errors.body ? 'body-error' : undefined}
      />
      <div id="body-error" className="text-[14px] text-orange-200">
        {formik.touched.body && formik.errors.body}
      </div>
      <div className={`flex items-center justify-between ${isReplyForm ? '' : 'mt-4'}`}>
        {!isReplyForm && (
          <span className="text-sm text-dark-200">
            {250 - formik.values.body.length} characters left
          </span>
        )}
        <Button variant="purple" size="lg" type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Posting...' : `Post ${isReplyForm ? 'Reply' : 'Comment'}`}
        </Button>
      </div>
    </form>
  );
}

export default memo(MessageForm);
