'use client';
import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant: 'grey' | 'blue' | 'purple' | 'dark-blue';
  size?: 'sm' | 'lg' | 'xl';
  type?: 'submit' | 'button' | 'reset';
  isActive?: boolean;
  onClick?: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  size = 'sm',
  type = 'button',
  isActive,
  onClick,
  disabled,
}) => {
  const paddings = {
    sm: 'px-[16px] py-[6px]',
    lg: 'px-6 py-3',
    xl: 'px-6 py-3 w-full md:w-fit',
  };
  const colors = {
    grey: 'bg-light-300 text-blue-300',
    blue: 'bg-blue-300 text-light-100',
    purple: 'bg-purple-200 text-light-100',
    'dark-blue': 'bg-dark-400 text-light-100',
  };
  const hoverColors = {
    grey: 'hover:bg-light-400 hover:text-blue-300',
    blue: 'hover:bg-blue-200',
    purple: 'hover:bg-purple-100 text-light-100',
    'dark-blue': 'hover:bg-dark-100 text-light-100',
  };
  const activeColors = 'bg-blue-300 text-white';
  const buttonColorStyles = isActive ? activeColors : colors[variant];
  const lgButtonTextSize = size === 'lg' ? 'md:text-[14px]' : '';

  return (
    <button
      type={type}
      onClick={() => onClick && onClick()}
      disabled={disabled}
      className={`max-h-[44px] w-fit rounded-lg text-sm font-semibold ${lgButtonTextSize} ${paddings[size]} ${buttonColorStyles} ${hoverColors[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
