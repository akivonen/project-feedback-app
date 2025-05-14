'use client';
import React, { useState } from 'react';
import Button from '../buttons/Button';
import Image from 'next/image';
import { useFormik } from 'formik';
import { feedbackSchema } from '@/validation';
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

type FeedbackDataForm = {
  curFeedback?: FeedbackFormData;
};

const FeedbackForm: React.FC<FeedbackDataForm> = ({ curFeedback }) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [hasProcessed, setHasProcessed] = useState<boolean>(false);
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
    validationSchema: feedbackSchema,
    onSubmit: async (feedback) => {
      setServerError(null);
      formik.setSubmitting(true);
      try {
        if (curFeedback) {
          await updateFeedbackAction({ id: curFeedback.id, ...feedback } as FeedbackFormData);
          toast.success('Feedback updated successfully');
          setHasProcessed(true);
        } else {
          await createFeedbackAction({
            ...feedback,
            user_id: session?.user?.id,
          } as FeedbackInsertData);
          toast.success('Feedback created successfully');
          setHasProcessed(true);
        }
        formik.resetForm();
        router.replace('/');
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'An unexpected error occured in feedback form';
        toast.error(errorMessage);
        setServerError(errorMessage);
        console.error('Form submission error:', error);
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  const handleRemoveFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!curFeedback) return;

    setIsDeleting(true);
    try {
      await deleteFeedbackAction(curFeedback.id, curFeedback.user_id);
      toast.success('Feedback deleted successfully');
      setHasProcessed(true);
      setModalIsOpen(false);
      router.replace('/');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete feedback';
      toast.error(errorMessage);
      setServerError(errorMessage);
      console.error('Delete error:', error);
      setModalIsOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const categoryOptions = [
    categoryNames[categoryNames.length - 1],
    ...categoryNames.slice(0, categoryNames.length - 1),
  ];
  const ErrorBorderStyles: Record<string, string> = {
    title: formik.touched.title && formik.errors.title ? 'border-orange-200' : 'border-transparent',
    description:
      formik.touched.description && formik.errors.description
        ? 'border-orange-200'
        : 'border-transparent',
  };

  if (formik.isSubmitting || isDeleting || hasProcessed || status === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <section className="relative mx-auto mb-[77px] mt-[30px] flex w-full flex-col justify-between rounded-lg bg-white p-6 text-dark-400 md:mb-[224px] md:mt-[144px] md:max-w-[540px] md:px-10 md:pb-10 md:pt-[52px]">
      <div className="absolute -top-5 h-10 w-10 md:-top-7 md:h-14 md:w-14">
        {curFeedback ? (
          <Image width={56} height={56} src="/icons/icon-edit-feedback.svg" alt="Edit feedback" />
        ) : (
          <Image width={56} height={56} src="/icons/icon-new-feedback.svg" alt="New feedback" />
        )}
      </div>
      <h2 className="text-lg font-bold -tracking-[0.25px] text-dark-400 md:text-2xl md:-tracking-[-0.33px]">
        {curFeedback ? `Editing ’${curFeedback.title}’` : 'Create New Feedback'}
      </h2>

      {serverError && (
        <div className="mt-4 rounded-md text-sm text-orange-200 md:text-base" role="alert">
          {serverError}
        </div>
      )}

      <form onSubmit={formik.handleSubmit}>
        <div className="mt-6 md:mt-10">
          <label htmlFor="title">
            <h3 className="text-sm font-bold -tracking-[0.18px] text-dark-400 md:text-[14px] md:-tracking-[0.19px]">
              Feedback Title
            </h3>
            <p className="mt-1 text-sm text-dark-200 md:text-[14px]">
              Add a short, descriptive headline
            </p>
          </label>
          <input
            type="text"
            name="title"
            id="title"
            autoComplete="off"
            onChange={formik.handleChange}
            value={formik.values.title}
            className={`mt-4 w-full rounded-md border bg-light-200 p-4 text-sm text-dark-400 outline-none placeholder:text-sm placeholder:text-light-600 focus:border focus:border-blue-300 md:text-[15px] ${ErrorBorderStyles['title']}`}
            aria-invalid={formik.touched.title && formik.errors.title ? 'true' : 'false'}
            aria-describedby={formik.errors.title ? 'title-error' : undefined}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-[14px] text-orange-200">{formik.errors.title}</div>
          )}
        </div>
        <div className="mt-6">
          <label htmlFor="category" className="mt-6">
            <h3 className="text-sm font-bold -tracking-[0.18px] text-dark-400 md:text-[14px] md:-tracking-[0.19px]">
              Category
            </h3>
            <p className="mt-1 text-sm text-dark-200 md:text-[14px]">
              Choose a category for your feedback
            </p>
          </label>
          <div className="mt-4">
            <Dropdown
              dropdownOptions={categoryOptions}
              selectedOption={formik.values.category || 'Feature'}
              handleChange={(value) => formik.setFieldValue('category', value)}
              isFeedbackFormField
            />
          </div>
        </div>

        {curFeedback && (
          <div className="mt-6">
            <label htmlFor="status" className="mt-6">
              <h3 className="text-sm font-bold -tracking-[0.18px] text-dark-400 md:text-[14px] md:-tracking-[0.19px]">
                Update Status
              </h3>
              <p className="mt-1 text-sm text-dark-200 md:text-[14px]">Change feature state</p>
            </label>
            <div className="mt-4">
              <Dropdown
                dropdownOptions={statusOptions}
                selectedOption={formik.values.status}
                handleChange={(value) => formik.setFieldValue('status', value)}
                isFeedbackFormField
              />
            </div>
          </div>
        )}

        <div className="mt-6">
          <label htmlFor="description" className="mt-6">
            <h3 className="text-sm font-bold -tracking-[0.18px] text-dark-400 md:text-[14px] md:-tracking-[0.19px]">
              Feedback Detail
            </h3>
            <p className="mt-1 text-sm text-dark-200 md:text-[14px]">
              Include any specific comments on what should be improved, added, etc.
            </p>
          </label>
          <textarea
            name="description"
            id="description"
            autoComplete="off"
            onChange={formik.handleChange}
            value={formik.values.description}
            className={`mt-4 w-full rounded-md border bg-light-200 p-4 text-sm text-dark-400 outline-none placeholder:text-sm placeholder:text-light-600 focus:border focus:border-blue-300 md:text-[15px] ${ErrorBorderStyles['description']}`}
            aria-invalid={formik.touched.description && !!formik.errors.description}
            aria-describedby={formik.errors.description ? 'description-error' : undefined}
          />
          <div className="text-[14px] text-orange-200">
            {formik.touched.description && formik.errors.description}
          </div>
        </div>
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
              disabled={formik.isSubmitting || isDeleting}
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
        isDeleting={isDeleting}
      />
    </section>
  );
};

export default FeedbackForm;
