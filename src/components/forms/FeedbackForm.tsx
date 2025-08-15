'use client';
import React, { useState, useTransition } from 'react';
import Button from '../buttons/Button';
import { Form, Formik } from 'formik';
import { feedbackClientSchema } from '@/app/validation';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import FormInput from '../common/form/FormInput';
import LoadingSpinner from '../common/LoadingSpinner';
import Dropdown from '../common/Dropdown';
import { useRouter } from 'next/navigation';
import { FeedbackFormData, FeedbackInsertData, FeedbackInputData, Category, Status } from '@/types';
import { categoryNames } from '@/lib/filter';
import {
  createFeedbackAction,
  updateFeedbackAction,
  deleteFeedbackAction,
} from '@/app/actions/feedbackActions';
import { statusOptions } from '@/lib/status';
import { toast } from 'react-toastify';
import FeedbackDeleteModal from '../feedback/FeedbackDeleteModal';
import { useSession } from 'next-auth/react';
import FormWrapper from '../common/form/FormWrapper';

export default function FeedbackForm({ curFeedback }: { curFeedback?: FeedbackFormData }) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const { data: session, status } = useSession();

  const initialValues = {
    title: '',
    category: 'Feature' as Category,
    status: 'Suggestion' as Status,
    description: '',
  };

  const onSubmit = async (feedback: FeedbackInputData) => {
    setServerError(null);
    startTransition(async () => {
      try {
        if (curFeedback) {
          await updateFeedbackAction({ id: curFeedback.id, ...feedback } as FeedbackFormData);
          toast.success('Feedback updated successfully');
          router.refresh();
        } else {
          const newFeedbackId = await createFeedbackAction({
            ...feedback,
            user_id: session?.user?.id,
          } as FeedbackInsertData);
          if (!newFeedbackId) {
            toast.error('Failed to create feedback');
            return;
          }
          toast.success('Feedback created successfully');
          router.push(`/feedbacks/${newFeedbackId}/`);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'An unexpected error occurred in feedback form';
        toast.error(errorMessage);
        setServerError(errorMessage);
        console.error('Form submission error:', error);
      }
    });
  };

  const handleRemoveFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!curFeedback) return;
    startTransition(async () => {
      try {
        await deleteFeedbackAction(curFeedback.id, curFeedback.user_id);
        toast.success('Feedback deleted successfully');
        setModalIsOpen(false);
        router.replace('/');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to delete feedback';
        toast.error(errorMessage);
        setServerError(errorMessage);
        console.error('Delete error:', error);
        setModalIsOpen(false);
      }
    });
  };

  const categoryOptions = [
    categoryNames[categoryNames.length - 1],
    ...categoryNames.slice(0, categoryNames.length - 1),
  ];

  if (!session?.user && status !== 'loading') {
    router.push('/auth/signin');
    return null;
  }

  if (curFeedback && session?.user?.id !== curFeedback.user_id) {
    router.push('/');
    return null;
  }

  if (isPending || status === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <FormWrapper
      formName={curFeedback ? `Editing ’${curFeedback.title}’` : 'Create New Feedback'}
      iconPath={curFeedback ? '/icons/icon-edit-feedback.svg' : '/icons/icon-new-feedback.svg'}
      iconAlt={curFeedback ? 'Edit feedback' : 'New feedback'}
      ariaLabelledBy="feedback-form-heading"
    >
      <Formik
        initialValues={curFeedback ? curFeedback : initialValues}
        validationSchema={toFormikValidationSchema(feedbackClientSchema)}
        onSubmit={onSubmit}
      >
        {(formik) => (
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
            <FormInput
              type="text"
              labelTitle="Feedback Title"
              name="title"
              required
              autoComplete="off"
              fieldDescription="Add a short, descriptive headline"
            />
            <FormInput name="category" fieldDescription="Choose a category for your feedback">
              <div className="mt-4">
                <Dropdown
                  dropdownOptions={categoryOptions}
                  selectedOption={formik.values.category || 'Feature'}
                  handleChange={(value) => formik.setFieldValue('category', value)}
                  isFeedbackFormField
                />
              </div>
            </FormInput>
            {curFeedback && (
              <FormInput
                name="status"
                labelTitle="Update Status"
                fieldDescription="Change feedback state"
              >
                <div className="mt-4">
                  <Dropdown
                    dropdownOptions={statusOptions}
                    selectedOption={formik.values.status}
                    handleChange={(value) => formik.setFieldValue('status', value)}
                    isFeedbackFormField
                  />
                </div>
              </FormInput>
            )}
            <FormInput
              isTextArea
              labelTitle="Feedback Detail"
              name="description"
              autoComplete="off"
              fieldDescription="Include any specific comments on what should be improved, added, etc."
            />
            <div className="mt-10 flex flex-col gap-4 md:mt-8 md:flex-row-reverse">
              <Button type="submit" size="xl" variant="purple" disabled={isPending}>
                {curFeedback ? 'Save Changes' : 'Add Feedback'}
              </Button>
              <Button
                type="button"
                size="xl"
                variant="dark-blue"
                onClick={() => router.push('/')}
                disabled={isPending || formik.isSubmitting}
              >
                Cancel
              </Button>
              {curFeedback && (
                <Button
                  type="button"
                  size="xl"
                  variant="orange"
                  disabled={isPending}
                  onClick={() => setModalIsOpen(true)}
                >
                  Delete
                </Button>
              )}
            </div>
          </Form>
        )}
      </Formik>

      <FeedbackDeleteModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        handleRemoveFeedback={handleRemoveFeedback}
        isSubmitting={isPending}
        isDeleting={isPending}
      />
    </FormWrapper>
  );
}
