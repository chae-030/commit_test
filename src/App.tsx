import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/common/Layout";
import Survey from "./pages/Survey";
import Container from "./components/common/Container";
import Home from "./pages/Home";
import MainComment from "./pages/MainComment";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Group from "./components/jobGroup/Group";
import Result from "./pages/Result";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Container children={<Home />} />} />
        <Route element={<Layout />}>
          <Route path="/survey" element={<Survey />} />
          <Route path="/job" element={<Group />} />
          <Route path="/job/:position" />
          <Route path="/result/:position" element={<Result />} />
          <Route
            path="/comments"
            element={<Navigate to="/comments/frontend" />}
          />
          <Route path="/comments/:sectionId" element={<MainComment />} />
          <Route path="/comments/login" element={<Login />} />
          <Route path="/comments/signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
