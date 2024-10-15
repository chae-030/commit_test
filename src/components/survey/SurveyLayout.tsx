import { questions } from "../../constants";
import SurveyTitle from "./SurveyTitle";
import SurveyButton from "./SurveyButton";
import Progress from "./Progress";
import { useSurvey } from "../../hooks/useSurvey";

const SurveyLayout = () => {
  const { step, handleBack, handleAnswerSelect, result } = useSurvey();
  const { options } = questions[step];

  if (result) return <div>{result}</div>;
  return (
    <div>
      <Progress
        step={step + 1}
        handleStep={handleBack}
        length={questions.length}
      />
      <SurveyTitle title={questions[step].question} />
      <div className="grid gap-5">
        {options.map(({ answer, jobType }, i) => (
          <SurveyButton
            key={i}
            answer={answer}
            handleClick={() => handleAnswerSelect(jobType, i)}
          />
        ))}
      </div>
    </div>
  );
};

export default SurveyLayout;
