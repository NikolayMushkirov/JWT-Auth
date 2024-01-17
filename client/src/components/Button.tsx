import React from "react";

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  type?: "submit";
  onClick?: () => void;
};

function Button({ children, ...rest }: Props) {
  return (
    <button
      {...rest}
      className="w-1/2 py-2 bg-sky-600 text-white text-lg rounded-2xl"
    >
      {children}
    </button>
  );
}

export default Button;
