'use client';
import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant: 'grey' | 'blue';
  isActive?: boolean;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ children, variant, isActive, onClick }) => {
  const colors = {
    grey: 'bg-light-300 text-blue-300',
    blue: 'bg-blue-300 text-light-100',
  };
  const hoverColors = {
    grey: 'hover:bg-light-400 hover:text-blue-300',
    blue: 'hover:bg-blue-200',
  };
  const activeColors = 'bg-blue-300 text-white';
  const buttonColorStyles = isActive ? activeColors : colors[variant];

  return (
    <button
      onClick={() => onClick && onClick()}
      className={`rounded-lg px-[16px] py-[6px] text-sm font-semibold ${buttonColorStyles} ${hoverColors[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
