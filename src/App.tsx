import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';
import Survey from './pages/Survey';
import Container from './components/common/Container';
import Home from './pages/Home';
import MainComment from './pages/MainComment';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Group from './components/jobGroup/Group';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Container children={<Home />} />} />
        <Route element={<Layout />}>
          <Route path="/survey" element={<Survey />} />
          <Route path="/job" element={<Group />} />
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
