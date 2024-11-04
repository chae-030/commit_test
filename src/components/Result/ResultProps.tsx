import React from "react";
import { JOB_TYPE, Position } from "../../types/constants";
import ResultButton from "./ResultButton";
import frontImg from "../../images/front.jpg";
import backImg from "../../images/back.jpg";
import uiuxImg from "../../images/uiux.jpg";
import productImg from "../../images/product.jpg";
import projectImg from "../../images/project.jpg";
import qaImg from "../../images/qa.jpg";
import devopsImg from "../../images/devops.jpg";

const ResultProps = ({
  position,
  title,
  description,
  details,
  skills,
  imgUrl,
}: JOB_TYPE) => {
  console.log(description);

  const imageMap: Record<Position, string> = {
    front: frontImg,
    back: backImg,
    uiux: uiuxImg,
    product: productImg,
    project: projectImg,
    qa: qaImg,
    devops: devopsImg,
  };

  return (
    <div className="flex-column justify-center min-h-screen">
      <div className="flex justify-center">
        <span>당신의 어울리는 IT 직군은?</span>
      </div>
      <div>
        <h1 className="flex justify-center text-brand">{title}</h1>
        <img src={imageMap[position]} alt="" />
      </div>
      <div>
        <div>
          <p>{description}</p>
          <p>{details}</p>
        </div>
      </div>
      <div className="flex-column justify-center">
        <span> 💡 주요기술 :</span>
        {skills.map((skill) => (
          <p>{skill}</p>
        ))}
      </div>

      <div>
        <span style={{ color: "#FFC801" }}>
          나와 같은 직군을 고른 사람들과 이야기하러 가볼까요?
        </span>
      </div>

      <div className="flex grid gap-2">
        <ResultButton
          backgroundColor="bg-brand"
          textColor="text-white"
          text="이야기 하러 가기"
        />
        <ResultButton
          backgroundColor="bg-white"
          textColor="bg-brand"
          text="다시 하러 가기"
          border="border border-brand"
        />
      </div>
    </div>
  );
};

export default ResultProps;
