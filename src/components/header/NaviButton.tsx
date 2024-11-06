import { TiThMenu } from "react-icons/ti";

type NaviButtonProps = { handleOpen: () => void };
const NaviButton = ({ handleOpen }: NaviButtonProps) => {
  return (
    <button className="text-2xl" onClick={handleOpen}>
      <TiThMenu />
    </button>
  );
};

export default NaviButton;
