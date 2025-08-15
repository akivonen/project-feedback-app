import React from 'react';
import Image from 'next/image';

type FormWrapperProps = {
  formName: string;
  children: React.ReactNode;
  iconPath?: string;
  iconAlt?: string;
  ariaLabelledBy?: string;
};

export default function FormWrapper({
  formName,
  children,
  iconPath,
  iconAlt,
  ariaLabelledBy,
}: FormWrapperProps) {
  return (
    <section
      className="relative mx-auto mb-[77px] mt-[30px] flex w-full flex-col justify-between rounded-lg bg-white p-6 text-dark-400 md:mb-[24px] md:mt-[144px] md:max-w-[540px] md:px-10 md:pb-10 md:pt-[52px]"
      aria-labelledby={ariaLabelledBy}
    >
      {iconPath && (
        <div className="absolute -top-5 h-10 w-10 md:-top-7 md:h-14 md:w-14">
          <Image
            width={56}
            height={56}
            src={iconPath}
            alt={iconAlt || `${formName} icon`}
            priority={false}
          />
        </div>
      )}
      <h2
        id={ariaLabelledBy}
        className="text-lg font-bold -tracking-[0.25px] text-dark-400 md:text-2xl md:-tracking-[-0.33px]"
      >
        {formName}
      </h2>
      {children}
    </section>
  );
}
