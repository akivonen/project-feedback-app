'use client';
import Link from 'next/link';
import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant: 'grey' | 'blue' | 'purple' | 'dark-blue' | 'orange';
  size?: 'sm' | 'lg' | 'xl';
  type?: 'submit' | 'button' | 'reset';
  isActive?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
};

export default function Button({
  children,
  variant,
  size = 'sm',
  type = 'button',
  isActive,
  onClick,
  disabled,
  href,
}: ButtonProps) {
  const baseStyles = 'max-h-[44px] w-fit rounded-lg text-sm font-semibold text-center';
  const sizeStyles = {
    sm: 'px-[16px] py-[6px]',
    lg: 'px-6 py-3 md:text-[14px]',
    xl: 'px-6 py-3 w-full md:w-fit',
  };
  const colorStyles = {
    grey: 'bg-light-300 text-blue-300',
    blue: 'bg-blue-300 text-light-100',
    purple: 'bg-purple-200 text-light-100',
    'dark-blue': 'bg-dark-400 text-light-100',
    orange: 'bg-orange-200 text-light-100',
  };
  const hoverStyles = {
    grey: 'hover:bg-light-400 hover:text-blue-300',
    blue: 'hover:bg-blue-200',
    purple: 'hover:bg-purple-100 text-light-100',
    'dark-blue': 'hover:bg-dark-100 text-light-100',
    orange: 'hover:bg-orange-100 text-light-100',
  };
  const activeColors = 'bg-blue-300 text-white';
  const buttonColorStyles = isActive ? activeColors : colorStyles[variant];
  const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${hoverStyles[variant]} ${buttonColorStyles}`;
  if (href) {
    return (
      <Link href={href} className={buttonStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={() => onClick && onClick()}
      disabled={disabled}
      className={buttonStyles}
    >
      {children}
    </button>
  );
}
