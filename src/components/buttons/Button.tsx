'use client';
import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant: 'grey' | 'blue' | 'purple';
  size?: 'sm' | 'lg';
  isActive?: boolean;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ children, variant, size = 'sm', isActive, onClick }) => {
  const paddings = {
    sm: `px-[16px] py-[6px]`,
    lg: `px-6 py-3`,
  };
  const colors = {
    grey: 'bg-light-300 text-blue-300',
    blue: 'bg-blue-300 text-light-100',
    purple: 'bg-purple-200 text-light-100',
  };
  const hoverColors = {
    grey: 'hover:bg-light-400 hover:text-blue-300',
    blue: 'hover:bg-blue-200',
    purple: 'hover:bg-purple-100 text-light-100',
  };
  const activeColors = 'bg-blue-300 text-white';
  const buttonColorStyles = isActive ? activeColors : colors[variant];
  const lgButtonTextSize = size === 'lg' ? 'md:text-[14px]' : '';

  return (
    <button
      onClick={() => onClick && onClick()}
      className={`rounded-lg text-sm font-semibold ${lgButtonTextSize} ${paddings[size]} ${buttonColorStyles} ${hoverColors[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
