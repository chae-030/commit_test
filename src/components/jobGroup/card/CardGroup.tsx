import { JOBS } from '../../../constants';
import JobCard from './Card';

const CardGroup = () => {
  return (
    <div>
      {JOBS.map((v) => (
        <JobCard key={v.title} {...v} />
      ))}
    </div>
  );
};

export default CardGroup;
