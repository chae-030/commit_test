import JobCard from './Card';
import { jobRoles } from '../../constant/data';

const CardGroup = () => {
  return (
    <div className="job-grid">
      {jobRoles.map((v) => (
        <JobCard key={v.title} {...v} />
      ))}
    </div>
  );
};

export default CardGroup;
