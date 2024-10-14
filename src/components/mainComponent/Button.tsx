import React from "react";

type buttonProps = {
  backgroundColor: "bg-white" | "bg-brand";
  textColor: "text-white" | "bg-brand";
  text: string;
  border?: string;
};

const Button = ({ text, backgroundColor, textColor, border }: buttonProps) => {
  return (
    <button
      className={`${backgroundColor} ${textColor} ${border} p-4 rounded-md mt-2`}
    >
      {text}
    </button>
  );
};

export default Button;
