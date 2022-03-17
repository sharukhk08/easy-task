import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Home from "./views/Home";
import ToadayTask from "./components/ToadayTask";
import AddTask from "./components/AddTask";
import NoRouteFound from "./components/common/NoRouteFound";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="dashboard" element={<Home />}>
            <Route path="add-task" element={<AddTask />} />
            <Route path="today-task" element={<ToadayTask />} />
            <Route path="/dashboard" element={<NoRouteFound />} />
          </Route>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NoRouteFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
