import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant: "grey" | "blue";
};

const Button: React.FC<ButtonProps> = ({ children, variant }) => {
  const colors = {
    grey: "bg-light-300 text-blue-300",
    blue: "bg-blue-300 text-white",
  };
  const hoverColors = {
    grey: "hover:bg-light-400",
    blue: "bg-blue-300 text-white",
  };

  return (
    <button
      className={`rounded-lg px-[16px] py-[6px] text-sm font-semibold ${colors[variant]} ${hoverColors[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
