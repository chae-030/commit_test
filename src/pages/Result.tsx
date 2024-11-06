import { useParams } from "react-router-dom";
import { JOBS } from "../constants";
import ResultProps from "../components/Result/ResultProps";

const Result = () => {
  const { position: params } = useParams();
  const job = JOBS.filter((job) => job.position === params)[0];
  const { position, title, description, details, skills } = job;

  return (
    <>
      <ResultProps
        position={position}
        title={title}
        description={description}
        details={details}
        skills={skills}
      />
    </>
  );
};

export default Result;
