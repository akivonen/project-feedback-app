'use client';
import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Button from '../../buttons/Button';
import { useField } from 'formik';
import { toast } from 'react-toastify';
import { imageSchema } from '@/app/validation';
import { z } from 'zod';

type ImagePickerProps = {
  name: string;
  label: string;
  imagePath?: string | null;
} & Omit<React.ComponentProps<'input'>, 'name'>;

export default function ImagePicker({ name, label, imagePath = null }: ImagePickerProps) {
  const [field, meta, helpers] = useField(name);
  const [pickedImage, setPickedImage] = useState<ArrayBuffer | string | null>(imagePath ?? null);
  const imageInput = useRef<HTMLInputElement | null>(null);
  const hasError = meta.touched && meta.error;
  const handlePickImageClick = useCallback(() => {
    imageInput.current?.click();
  }, []);

  const handleClearImage = useCallback(() => {
    setPickedImage(null);
    helpers.setValue(null);
    if (imageInput.current) {
      imageInput.current.value = '';
    }
  }, [helpers]);

  const handleImageChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (!file) {
        setPickedImage(null);
        helpers.setValue(null, true);
        return;
      }
      try {
        await imageSchema.parse(file);
        const fileReader = new FileReader();
        fileReader.onload = () => {
          if (typeof fileReader.result === 'string') {
            setPickedImage(fileReader.result);
            helpers.setValue(file, true);
          }
        };
        fileReader.onerror = () => {
          helpers.setValue(null, true);
          toast.error('Failed to read the image file. Please try another file');
        };
        fileReader.readAsDataURL(file);
      } catch (error) {
        setPickedImage(null);
        helpers.setValue(null, true);
        const errorMessage =
          error instanceof z.ZodError ? error.errors[0].message : 'Invalid image file';
        toast.error(errorMessage);
      }
    },
    [helpers]
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
            hasError ? 'border-orange-200' : 'border-dark-400/20'
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
          {...field}
          type="file"
          name={name}
          id={name}
          accept="image/png, image/jpeg, image/jpg"
          ref={imageInput}
          onChange={handleImageChange}
          className="hidden"
          aria-describedby={hasError ? `${name}-error` : undefined}
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
          {hasError && <div className="text-[14px] text-orange-200">{meta.error}</div>}
        </div>
      </div>
    </div>
  );
}
