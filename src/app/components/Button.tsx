import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant: "grey" | "blue";
};

const Button: React.FC<ButtonProps> = ({ children, variant }) => {
  const colors = {
    grey: "bg-light-100 text-blue-300",
    blue: "bg-blue-300 text-white",
  };

  return (
    <button
      className={`rounded-lg px-[16px] py-[6px] text-[13px] font-semibold ${colors[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
