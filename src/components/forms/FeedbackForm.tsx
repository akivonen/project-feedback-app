'use client';
import React, { useState, useTransition } from 'react';
import Button from '../buttons/Button';
import { useFormik } from 'formik';
import { feedbackClientSchema } from '@/app/validation';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import FormInput from '../common/FormInput';
import LoadingSpinner from '../common/LoadingSpinner';
import Dropdown from '../common/Dropdown';
import { useRouter } from 'next/navigation';
import { FeedbackFormData, FeedbackInsertData } from '@/types';
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
import FormWrapper from '../common/FormWrapper';

export default function FeedbackForm({ curFeedback }: { curFeedback?: FeedbackFormData }) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const { data: session, status } = useSession();

  if (!session?.user && status !== 'loading') {
    router.push('/auth/signin');
  }

  if (curFeedback && session?.user?.id !== curFeedback.user_id) {
    router.push('/');
  }

  const initialValues = {
    title: '',
    category: 'Feature',
    status: 'Suggestion',
    description: '',
  };

  const formik = useFormik({
    initialValues: curFeedback ? curFeedback : initialValues,
    validationSchema: toFormikValidationSchema(feedbackClientSchema),
    onSubmit: async (feedback) => {
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
            error instanceof Error ? error.message : 'An unexpected error occured in feedback form';
          toast.error(errorMessage);
          setServerError(errorMessage);
          console.error('FeedbackForm submission error:', error);
        }
      });
    },
  });

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

  if (isPending || status === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <FormWrapper
      formName={curFeedback ? `Editing ’${curFeedback.title}’` : 'Create New Feedback'}
      iconPath={curFeedback ? '/icons/icon-edit-feedback.svg' : '/icons/icon-new-feedback.svg'}
      iconAlt={curFeedback ? 'Edit feedback' : 'New feedback'}
    >
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
          fieldName="title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          isTouched={formik.touched.title}
          errors={formik.errors.title}
          autoComplete="off"
          fieldDescription="Add a short, descriptive headline"
        />
        <FormInput fieldName="category" fieldDescription="Choose a category for your feedback">
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
          <FormInput fieldName="update status" fieldDescription="Change feedback state">
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
          fieldName="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          isTouched={formik.touched.description}
          errors={formik.errors.description}
          autoComplete="off"
          fieldDescription="Add a short, descriptive headline"
        />
        <div className="mt-10 flex flex-col gap-4 md:mt-8 md:flex-row-reverse">
          <Button type="submit" size="xl" variant="purple" disabled={formik.isSubmitting}>
            {curFeedback ? 'Save Changes' : 'Add Feedback'}
          </Button>
          <Button type="button" size="xl" variant="dark-blue" onClick={() => router.back()}>
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
      </form>
      <FeedbackDeleteModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        handleRemoveFeedback={handleRemoveFeedback}
        isSubmitting={formik.isSubmitting}
        isDeleting={isPending}
      />
    </FormWrapper>
  );
}
