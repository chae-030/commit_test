import { useState } from "react";
import { Position } from "../types/constants";
import { questions } from "../constants";

type JobScores = Record<Position, number>;

export const useSurvey = () => {
  const [jobScores, setJobScores] = useState<JobScores>({
    front: 0,
    back: 0,
    uiux: 0,
    product: 0,
    project: 0,
    qa: 0,
    devops: 0,
  });
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>([
    null,
  ]);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswerSelect = (jobTypes: Position[], answerIndex: number) => {
    updateJobScores(jobTypes, 1);
    saveSelectedAnswer(answerIndex);

    if (isLastStep()) {
      calculateResult();
    } else {
      nextStep();
    }
  };

  const handleBack = () => {
    if (step === 0) return;

    const previousAnswerIndex = selectedAnswers[step - 1];
    if (previousAnswerIndex !== null) {
      const previousAnswer =
        questions[step - 1].options[Number(previousAnswerIndex)];
      updateJobScores(previousAnswer.jobType, -1);
    }

    resetSelectedAnswer(step - 1);
    previousStep();
  };

  const updateJobScores = (jobTypes: Position[], weight: number) => {
    const updatedScores: JobScores = { ...jobScores };
    jobTypes.forEach((jobType) => (updatedScores[jobType] += weight));
    setJobScores(updatedScores);
  };

  const saveSelectedAnswer = (answerIndex: number) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[step] = answerIndex.toString();
    setSelectedAnswers(updatedAnswers);
  };

  const resetSelectedAnswer = (stepIndex: number) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[stepIndex] = null;
    setSelectedAnswers(updatedAnswers);
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const previousStep = () => setStep((prev) => prev - 1);
  const isLastStep = () => step === questions.length - 1;

  const calculateResult = () => {
    const highestJobType = Object.keys(jobScores).reduce((a, b) =>
      jobScores[a as Position] > jobScores[b as Position] ? a : b
    );
    setResult(highestJobType);
  };

  return {
    step,
    result,
    selectedAnswers,
    jobScores,
    handleAnswerSelect,
    handleBack,
  };
};
