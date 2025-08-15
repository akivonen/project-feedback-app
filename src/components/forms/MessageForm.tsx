'use client';
import React, { memo, useTransition } from 'react';
import { Form, Formik, FormikState } from 'formik';
import Button from '../buttons/Button';
import { commentFormSchema } from '@/app/validation';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useParams } from 'next/navigation';
import { createCommentAction } from '@/app/actions/commentActions';
import { createReplyAction } from '@/app/actions/replyActions';
import { toast } from 'react-toastify';
import MessageInput from '../common/form/MessageInput';

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
  const [isPending, startTransition] = useTransition();
  const initialValues = {
    body: '',
  };
  type FormValues = typeof initialValues;
  const replyFormStyles = isReplyForm
    ? 'mt-6 flex flex-col items-end gap-4 md:flex-row md:items-start'
    : '';

  const onSubmit = async (
    { body }: { body: string },
    { resetForm }: { resetForm: (nextState?: Partial<FormikState<FormValues>>) => void }
  ) => {
    startTransition(async () => {
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
      }
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(commentFormSchema)}
      onSubmit={onSubmit}
      validateOnBlur={true}
      validateOnChange={true}
    >
      {(formik) => (
        <Form
          className={replyFormStyles}
          id={id}
          aria-label={isReplyForm ? 'Reply form' : 'Comment form'}
          noValidate
        >
          <MessageInput
            name="body"
            isReplyForm={isReplyForm}
            autoComplete="off"
            maxLength={250}
            rows={2}
          />
          <div className={`flex items-center justify-between ${isReplyForm ? '' : 'mt-4'}`}>
            {!isReplyForm && (
              <span className="text-sm text-dark-200">
                {250 - formik.values.body.length} characters left
              </span>
            )}
            <Button variant="purple" size="lg" type="submit" disabled={isPending}>
              {isPending ? 'Posting...' : `Post ${isReplyForm ? 'Reply' : 'Comment'}`}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default memo(MessageForm);
