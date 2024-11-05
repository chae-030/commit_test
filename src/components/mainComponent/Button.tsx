type buttonProps = {
  backgroundColor: "bg-white" | "bg-brand";
  textColor: "text-white" | "bg-brand";
  text: string;
  border?: string;
  otherStyle?: string;
  type?: "submit" | "reset" | "button" | undefined;
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
      className={`${backgroundColor} ${textColor} ${border} p-4 rounded-md ${otherStyle}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
