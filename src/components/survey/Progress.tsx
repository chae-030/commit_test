import React from "react";

type ProgressProps = {
  step: number;
  handleStep: () => void;
  length: number;
};
const Progress = ({ step, handleStep, length }: ProgressProps) => {
  const progressPercentage = (step / length) * 100;
  return (
    <div>
      <div className="flex">
        {step > 1 && <button onClick={handleStep}>뒤로가기</button>}
        <span className="ml-auto">
          {step}/{length}
        </span>
      </div>

      <div className="border border-slate-900 bg-slate-200 h-3 relative rounded-md">
        <div
          className="bg-brand h-full rounded-md transition-width"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Progress;
