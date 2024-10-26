import { Position } from "../../../types/constants";
import frontImg from "../../../images/front.jpg";
import backImg from "../../../images/back.jpg";
import uiuxImg from "../../../images/uiux.jpg";
import productImg from "../../../images/product.jpg";
import projectImg from "../../../images/project.jpg";
import qaImg from "../../../images/qa.jpg";
import devopsImg from "../../../images/devops.jpg";

export type JobCardProps = {
  title: string;
  description: string;
  imgUrl: string;
  position: Position;
};

const imageMap: Record<Position, string> = {
  front: frontImg,
  back: backImg,
  uiux: uiuxImg,
  product: productImg,
  project: projectImg,
  qa: qaImg,
  devops: devopsImg,
};

const JobCard = ({ title, description, position }: JobCardProps) => {
  return (
    <div
      className="flex w-full text-left items-center p-5 mb-5 gap-3 justify-between
    bg-white border border-brand rounded-xl shadow-jobShadow transition-width"
    >
      <div className="flex-shrink overflow-hidden w-5/12 h-44">
        <img
          className="w-full h-full object-cover"
          src={imageMap[position]}
          alt={title}
        />
      </div>
      <div className="job-text w-7/12">
        <h3 className="text-[#ffc801] font-bold text-xl pb-3">{title}</h3>
        <p className="text-[#64748b] text-base">{description}</p>
      </div>
    </div>
  );
};

export default JobCard;
