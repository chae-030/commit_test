export type JobCardProps = {
  title: string;
  description: string;
  imgUrl: string;
};

const JobCard = ({ title, description, imgUrl }: JobCardProps) => {
  return (
    <div className="job-card">
      <img src={imgUrl} alt={title} className="job-icon" />
      <div className="job-text">
        <h3 className="job-title">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default JobCard;
