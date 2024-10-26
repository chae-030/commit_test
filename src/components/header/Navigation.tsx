import { Link } from "react-router-dom";

const mui = [
  {
    link: "/survey",
    text: "테스트 하기",
  },
  {
    link: "/job",
    text: "직군 알아보기",
  },
  {
    link: "/comments",
    text: "커뮤니티",
  },
];
const Navigation = ({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) => {
  return (
    <ul className="right-0 absolute top-10 border border-brand bg-white rounded-md z-10 p-5 grid gap-4">
      {mui.map(({ link, text }) => (
        <li onClick={() => setIsOpen(false)} key={link}>
          <Link to={link}>{text}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
