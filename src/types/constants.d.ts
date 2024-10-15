export type Position =
  | "front"
  | "back"
  | "uiux"
  | "product"
  | "project"
  | "devops"
  | "qa";

export type JOB_TYPE = {
  position: Position;
  title: string;
  description: string;
  details: string;
  skills: string[];
  imgUrl: string;
};

export type QuestionType = {
  question: string;
  options: OptionType[];
};
export type OptionType = {
  answer: string;
  jobType: Position[];
};
