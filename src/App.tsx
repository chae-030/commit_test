import React, { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/common/Layout";
import Survey from "./pages/Survey";
import Container from "./components/common/Container";
import Home from "./pages/Home";
import MainComment from "./components/firebaseSignUpComments/MainComment";
import Login from "./components/firebaseSignUpComments/Login";
import Signup from "./components/firebaseSignUpComments/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Container children={<Home />} />} />
        <Route element={<Layout />}>
          <Route path="/survey" element={<Survey />} />
          <Route path="/job" />
          <Route path="/job/:position" />
          <Route path="/result/:position" />
          <Route path="/maincomment" element={<MainComment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
