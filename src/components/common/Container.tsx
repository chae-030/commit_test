import React from "react";

type ContainerProps = {
  children: React.ReactNode;
};
const Container = ({ children }: ContainerProps) => {
  return <main className="max-w-lg w-11/12 mx-auto">{children}</main>;
};

export default Container;
