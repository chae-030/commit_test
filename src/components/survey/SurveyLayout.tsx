import { questions } from "../../constants";
import SurveyTitle from "./SurveyTitle";
import SurveyButton from "./SurveyButton";
import Progress from "./Progress";
import { useSurvey } from "../../hooks/useSurvey";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SurveyLayout = () => {
  const { step, handleBack, handleAnswerSelect, result } = useSurvey();
  const { options } = questions[step];

  const navigate = useNavigate();

  useEffect(() => {
    if (result) {
      navigate(`/result/${result}`);
    }
  }, [result, navigate]);

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
