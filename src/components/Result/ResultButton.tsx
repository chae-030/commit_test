import { buttonProps } from "../common/Button";

type resultButtonProps = buttonProps;

const ResultButton = ({
  text,
  backgroundColor,
  textColor,
  border,
}: resultButtonProps) => {
  return (
    <button
      className={`${backgroundColor} ${textColor} ${border} p-4 rounded-md mt-2`}
    >
      {text}
    </button>
  );
};

export default ResultButton;
