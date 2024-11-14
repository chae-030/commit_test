import { JOB_TYPE, Position } from "../../types/constants";
import frontImg from "../../images/front.jpg";
import backImg from "../../images/back.jpg";
import uiuxImg from "../../images/uiux.jpg";
import productImg from "../../images/product.jpg";
import projectImg from "../../images/project.jpg";
import qaImg from "../../images/qa.jpg";
import devopsImg from "../../images/devops.jpg";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

const ResultProps = ({
  position,
  title,
  description,
  details,
  skills,
}: Omit<JOB_TYPE, "imgUrl">) => {
  const navigate = useNavigate();

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
    <div className="flex-column justify-center min-h-screen m-16 ">
      <div className="flex justify-center text-sm">
        <span>당신의 어울리는 IT 직군은?</span>
      </div>
      <div>
        <h1 className="flex justify-center text-brand text-2xl">{title}</h1>
        <img src={imageMap[position]} alt="" />
      </div>
      <div>
        <div className="flex-column justify-center mt-12">
          <p>{description}</p>
          <p>{details}</p>
        </div>
      </div>
      <div className="flex-column justify-center mt-16">
        <span> 💡 주요기술 :</span>
        {skills.map((skill, index) => (
          <p key={index}>{skill}</p>
        ))}
      </div>

      <div className="flex justify-center items-center mt-16">
        <span style={{ color: "#FFC801" }}>
          나와 같은 직군을 고른 사람들과 이야기하러 가볼까요?
        </span>
      </div>

      <div className="grid gap-2">
        <Button
          backgroundColor="bg-brand"
          textColor="text-white"
          text="이야기 하러 가기"
          onClick={() => navigate(`/comments/${position}`)}
        />
        <Button
          backgroundColor="bg-white"
          textColor="text-brand"
          text="테스트 다시하기"
          border="border border-brand"
          onClick={() => navigate("/survey")}
        />
      </div>
    </div>
  );
};

export default ResultProps;
