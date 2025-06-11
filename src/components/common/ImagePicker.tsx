'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Button from '../buttons/Button';
import { FormikErrors } from 'formik';

export default function ImagePicker({
  name,
  label,
  setFieldValue,
  isTouched,
  errors,
}: {
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
}) {
  const [pickedImage, setPickedImage] = useState<ArrayBuffer | string | null>(null);
  const imageInput = useRef<HTMLInputElement | null>(null);
  const handlePickImageClick = () => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setPickedImage(null);
      setFieldValue('image', null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
    setFieldValue('image', file);
  };
  return (
    <div className="mt-6 md:mt-10">
      <label htmlFor={name}>
        <h3 className="text-sm font-bold -tracking-[0.18px] text-dark-400 md:text-[14px] md:-tracking-[0.19px]">
          {label}
        </h3>
      </label>
      <div className="flex flex-col items-center sm:flex-row sm:items-start">
        <div className="relative mt-4 flex h-40 w-40 items-center justify-center rounded-sm border bg-light-200 p-4 text-sm text-dark-400 outline-none">
          {!pickedImage && <p>No image picked yet.</p>}
          {typeof pickedImage === 'string' && pickedImage.startsWith('data:') && (
            <Image src={pickedImage} alt="The image selected by the user." fill />
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
        />
        <div className="mt-4 sm:ml-4">
          <Button type="button" size="xl" variant="blue" onClick={handlePickImageClick}>
            Pick an Image
          </Button>
          {isTouched && errors && <div className="text-[14px] text-orange-200">{errors}</div>}
        </div>
      </div>
    </div>
  );
}
