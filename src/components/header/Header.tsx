import { useState } from "react";
import Logo from "./Logo";
import NaviButton from "./NaviButton";
import Navigation from "./Navigation";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex justify-center max-w-lg w-11/12 mx-auto">
      <Logo />
      <NaviButton handleOpen={() => setIsOpen((prev) => !prev)} />
      {isOpen && <Navigation />}
    </header>
  );
};

export default Header;
