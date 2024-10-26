import React from "react";

type ContainerProps = {
  children: React.ReactNode;
};
const Container = ({ children }: ContainerProps) => {
  return <main className="max-w-2xl w-11/12 mx-auto">{children}</main>;
};

export default Container;
