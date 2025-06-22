'use client';
import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Button from '../buttons/Button';
import { FormikErrors } from 'formik';
import { toast } from 'react-toastify';
import { imageSchema } from '@/app/validation';
import { z } from 'zod';

type ImagePickerProps = {
  name: string;
  label: string;
  setFieldValue: (
    field: string,
    value: File | null,
    shouldValidate?: boolean
  ) =>
    | Promise<void>
    | Promise<
        FormikErrors<{
          image: null;
        }>
      >;
  isTouched: boolean | undefined;
  errors: string | undefined;
  imagePath?: string | null;
};

export default function ImagePicker({
  name,
  label,
  setFieldValue,
  isTouched,
  errors,
  imagePath = null,
}: ImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<ArrayBuffer | string | null>(imagePath ?? null);
  const imageInput = useRef<HTMLInputElement | null>(null);
  const handlePickImageClick = useCallback(() => {
    imageInput.current?.click();
  }, []);

  const handleClearImage = useCallback(() => {
    setPickedImage(null);
    setFieldValue('image', null);
    if (imageInput.current) {
      imageInput.current.value = '';
    }
  }, [setFieldValue]);

  const handleImageChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (!file) {
        setPickedImage(null);
        setFieldValue('image', null, true);
        return;
      }
      try {
        await imageSchema.parse(file);
        const fileReader = new FileReader();
        fileReader.onload = () => {
          if (typeof fileReader.result === 'string') {
            setPickedImage(fileReader.result);
            setFieldValue('image', file, true);
          }
        };
        fileReader.onerror = () => {
          setFieldValue('image', null, true);
          toast.error('Failed to read the image file. Please try another file');
        };
        fileReader.readAsDataURL(file);
        console.log(1);
      } catch (error) {
        setPickedImage(null);
        setFieldValue('image', null, true);
        const errorMessage =
          error instanceof z.ZodError ? error.errors[0].message : 'Invalid image file';
        toast.error(errorMessage);
      }
    },
    [setFieldValue]
  );

  return (
    <div className="mt-6 md:mt-10">
      <label
        className="text-sm font-bold -tracking-[0.18px] text-dark-400 md:text-[14px] md:-tracking-[0.19px]"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="mt-4 flex flex-col items-center sm:flex-row sm:items-start">
        <div
          className={`relative flex h-40 w-40 items-center justify-center rounded-md border bg-light-200 p-4 text-sm text-dark-400 outline-none ${
            isTouched && errors ? 'border-orange-200' : 'border-dark-400/20'
          }`}
          aria-live="polite"
        >
          {!pickedImage && <p>No image picked yet.</p>}
          {typeof pickedImage === 'string' && (
            <Image
              src={pickedImage}
              alt="Selected profile image"
              sizes="160px"
              fill
              className="rounded-md object-cover"
              priority={false}
            />
          )}
        </div>
        <input
          type="file"
          name={name}
          id={name}
          accept="image/png, image/jpeg, image/jpg"
          ref={imageInput}
          onChange={handleImageChange}
          className="hidden"
          aria-describedby={errors && isTouched ? `${name}-error` : undefined}
        />
        <div className="mt-4 flex flex-col gap-4 sm:ml-4 sm:mt-0">
          <Button type="button" size="xl" variant="blue" onClick={handlePickImageClick}>
            Pick an Image
          </Button>
          {pickedImage && (
            <Button type="button" size="xl" variant="blue" onClick={handleClearImage}>
              Clear Image
            </Button>
          )}
          {isTouched && errors && <div className="text-[14px] text-orange-200">{errors}</div>}
        </div>
      </div>
    </div>
  );
}
