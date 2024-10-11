import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/common/Layout";
import Survey from "./pages/Survey";
import Container from "./components/common/Container";
import Home from "./pages/Home";

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
        </Route>
      </Routes>
    </BrowserRouter>
    // 테스트
  );
};

export default App;
