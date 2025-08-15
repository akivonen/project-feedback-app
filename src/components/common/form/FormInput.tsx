'use client';
import { toCapitalCaseWithSpaces } from '@/lib/utils';
import { toCamelCase } from 'drizzle-orm/casing';
import { useField } from 'formik';
import React from 'react';

type FormInput = {
  name: string;
  isTouched?: boolean | undefined;
  fieldDescription?: string;
  isTextArea?: boolean;
  children?: React.ReactNode;
  labelTitle?: string;
} & Omit<React.ComponentProps<'input'>, 'name'>;

export default function FormInput(props: FormInput) {
  const { name, fieldDescription, isTextArea, labelTitle, children } = props;
  const [field, meta] = useField(name);
  const hasError = meta.touched && meta.error;
  const errorBorderStyles = hasError ? 'border-orange-200' : 'border-transparent';
  const inputName = toCamelCase(name);
  const labelName = labelTitle ?? toCapitalCaseWithSpaces(name);

  const input = children ? (
    children
  ) : isTextArea ? (
    <textarea
      {...field}
      name={inputName}
      id={inputName}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      disabled={props.disabled}
      className={`mt-4 w-full rounded-md border bg-light-200 p-4 text-sm text-dark-400 outline-none placeholder:text-sm placeholder:text-light-600 focus:border focus:border-blue-300 md:text-[15px] ${errorBorderStyles} ${props.disabled ? 'text-dark-400/50' : ''}`}
      aria-invalid={meta.touched && !!meta.error}
      aria-describedby={hasError ? `${inputName}-error` : ''}
      aria-disabled={props.disabled}
    />
  ) : (
    <input
      {...field}
      {...props}
      name={inputName}
      id={inputName}
      onChange={field.onChange}
      onBlur={field.onBlur}
      className={`mt-4 w-full rounded-md border bg-light-200 p-4 text-sm text-dark-400 outline-none placeholder:text-sm placeholder:text-light-600 focus:border focus:border-blue-300 md:text-[15px] ${errorBorderStyles} ${props.disabled ? 'text-dark-400/50' : ''}`}
      aria-invalid={meta.touched && !!meta.error ? true : false}
      aria-describedby={hasError ? `${inputName}-error` : ''}
      aria-disabled={props.disabled}
    />
  );
  return (
    <div className="mt-6 md:mt-10">
      <label
        htmlFor={inputName}
        className="text-sm font-bold -tracking-[0.18px] text-dark-400 md:text-[14px] md:-tracking-[0.19px]"
      >
        {labelName}
      </label>
      {fieldDescription && (
        <p className="mt-1 text-sm text-dark-200 md:text-[14px]">{fieldDescription}</p>
      )}
      {input}
      {hasError && (
        <div id={`${inputName}-error`} className="mt-1 text-[14px] text-orange-200">
          {meta.error}
        </div>
      )}
    </div>
  );
}
