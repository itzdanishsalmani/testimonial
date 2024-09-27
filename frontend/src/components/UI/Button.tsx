import React from "react";

interface ButtonProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const BlueButton = ({ text, onClick }: ButtonProps) => {
  return (
    <>
      <button
        className="border rounded-lg font-semibold text-white bg-blue-500 p-2"
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};
