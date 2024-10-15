type buttonProps = {
  backgroundColor: "bg-white" | "bg-brand";
  textColor: "text-white" | "bg-brand";
  text: string;
  border?: string;
  otherStyle?: string;
  type?:"submit" | "reset" | "button" | undefined
  onClick?: (() => void) | undefined;
};

const Button = ({
  text,
  backgroundColor,
  textColor,
  border,
  otherStyle,
  type,
  onClick,
}: buttonProps) => {
  return (
    <button
      className={`${backgroundColor} ${textColor} ${border} ${otherStyle} p-4 rounded-md mt-2`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
