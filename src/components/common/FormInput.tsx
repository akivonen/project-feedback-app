'use client';
import { toCapitalCaseWithSpaces } from '@/lib/utils';
import { toCamelCase } from 'drizzle-orm/casing';
import React from 'react';

type FormInput = React.ComponentProps<'input'> & {
  fieldName: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  isTouched?: boolean | undefined;
  errors?: string | undefined;
  fieldDescription?: string;
  isTextArea?: boolean;
  children?: React.ReactNode;
  labelTitle?: string;
  disabled?: boolean;
  required?: boolean;
};

export default function FormInput(props: FormInput) {
  const {
    fieldName,
    onChange,
    onBlur,
    type,
    value,
    isTouched,
    errors,
    fieldDescription,
    isTextArea,
    labelTitle,
    children,
    disabled,
    required,
  } = props;
  const errorBorderStyles = isTouched && errors ? 'border-orange-200' : 'border-transparent';
  const inputName = toCamelCase(fieldName);
  const labelName = labelTitle ?? toCapitalCaseWithSpaces(fieldName);

  const input = children ? (
    children
  ) : isTextArea ? (
    <textarea
      name={inputName}
      id={inputName}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      className={`mt-4 w-full rounded-md border bg-light-200 p-4 text-sm text-dark-400 outline-none placeholder:text-sm placeholder:text-light-600 focus:border focus:border-blue-300 md:text-[15px] ${errorBorderStyles} ${disabled ? 'text-dark-400/50' : ''}`}
      aria-invalid={isTouched && !!errors}
      aria-describedby={errors && isTouched ? `${inputName}-error` : ''}
      aria-disabled={disabled}
    />
  ) : (
    <input
      type={type}
      name={inputName}
      id={inputName}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      disabled={disabled}
      required={required}
      className={`mt-4 w-full rounded-md border bg-light-200 p-4 text-sm text-dark-400 outline-none placeholder:text-sm placeholder:text-light-600 focus:border focus:border-blue-300 md:text-[15px] ${errorBorderStyles} ${disabled ? 'text-dark-400/50' : ''}`}
      aria-invalid={isTouched && !!errors ? true : false}
      aria-describedby={errors && isTouched ? `${inputName}-error` : ''}
      aria-disabled={disabled}
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
      {isTouched && errors && (
        <div id={`${inputName}-error`} className="mt-1 text-[14px] text-orange-200">
          {errors}
        </div>
      )}
    </div>
  );
}
