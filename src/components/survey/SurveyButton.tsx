type SurveyButtonProps = {
  answer: string;
  handleClick: () => void;
};
const SurveyButton = ({ answer, handleClick }: SurveyButtonProps) => {
  return (
    <button
      className="border border-brand p-4 rounded-md hover:bg-brand hover:text-white"
      onClick={handleClick}
    >
      {answer}
    </button>
  );
};

export default SurveyButton;
