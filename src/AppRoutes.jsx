import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Home from "./views/Home";
import ToadayTask from "./components/ToadayTask";
import AddTask from "./components/AddTask";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="dashboard" element={<Home />}>
            <Route path="add-task" element={<AddTask />} />
            <Route path="today-task" element={<ToadayTask />} />
          </Route>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
