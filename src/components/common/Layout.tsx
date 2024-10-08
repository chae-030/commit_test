import Header from "../header/Header";
import { Outlet } from "react-router-dom";
import Container from "./Container";

const Layout = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
