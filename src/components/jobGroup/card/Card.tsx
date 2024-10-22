export type JobCardProps = {
  title: string;
  description: string;
  imgUrl: string;
};

const JobCard = ({ title, description, imgUrl }: JobCardProps) => {
  return (
    <div
      className="flex w-full h-48 text-left items-center p-5 mb-5
    bg-white border border-brand rounded-xl shadow-jobShadow transition-width"
    >
      <img src={imgUrl} alt={title} className="w-64 h-44 mr-5" />
      <div className="job-text">
        <h3 className="text-[#ffc801] font-bold text-xl pb-3">{title}</h3>
        <p className="text-[#64748b] text-base">{description}</p>
      </div>
    </div>
  );
};

export default JobCard;
