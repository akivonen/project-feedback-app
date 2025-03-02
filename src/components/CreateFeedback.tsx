'use client';
import React from 'react';
import Button from './buttons/Button';
import Image from 'next/image';
import { useFormik } from 'formik';
import { feedbackSchema } from '@/validation';
import Dropdown from './suggestions/Dropdown';
import { useRouter } from 'next/navigation';
import useFilter from '@/hooks/useFilter';
import { Category } from '@/types';

const CreateFeedback: React.FC = () => {
  const { categories } = useFilter();
  const filteredCategories: Category[] = categories.filter((c) => c !== 'All');
  const categoryOptions = [
    filteredCategories[filteredCategories.length - 1],
    ...filteredCategories.slice(0, filteredCategories.length - 1),
  ];
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      title: '',
      category: 'Feature',
      description: '',
    },
    validationSchema: feedbackSchema,
    onSubmit: async (values) => {
      formik.setSubmitting(true);
      try {
        console.log(values);
        formik.resetForm();
      } catch (err) {
        console.log(err);
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  return (
    <section className="relative mx-auto mb-[77px] mt-[30px] flex w-full flex-col justify-between rounded-lg bg-white p-6 text-dark-400 md:mb-[224px] md:mt-[144px] md:max-w-[540px] md:px-10 md:pb-10 md:pt-[52px]">
      <div className="absolute -top-5 h-10 w-10 md:-top-7 md:h-14 md:w-14">
        <Image width="56" height="56" src="/icons/icon-new-feedback.svg" alt="New feedback" />
      </div>
      <h2 className="text-lg font-bold -tracking-[0.25px] text-dark-400 md:text-2xl md:-tracking-[-0.33px]">
        Create New Feedback
      </h2>
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
            onChange={formik.handleChange}
            value={formik.values.title}
            className={`mt-4 w-full rounded-md bg-light-200 p-4 text-sm text-dark-400 outline-none placeholder:text-sm placeholder:text-light-600 focus:border focus:border-blue-300 md:text-[15px]`}
          />
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
            onChange={formik.handleChange}
            value={formik.values.description}
            className="mt-4 w-full rounded-md bg-light-200 p-4 text-sm text-dark-400 outline-none placeholder:text-sm placeholder:text-light-600 focus:border focus:border-blue-300 md:text-[15px]"
          />
        </div>
        <div className="mt-10 flex flex-col gap-4 md:mt-8 md:flex-row-reverse">
          <Button type="submit" size="xl" variant="purple">
            Add Feedback
          </Button>
          <Button type="button" size="xl" variant="dark-blue" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
};

export default CreateFeedback;
