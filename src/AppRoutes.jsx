import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Home from "./views/Home";
import ToadayTask from "./components/ToadayTask";
import AddTask from "./components/AddTask";
import AllTasks from "./components/AllTasks";
import NoRouteFound from "./components/common/NoRouteFound";
import Profile from "./components/Profile";
import ViewTaskDetails from "./components/ViewTaskDetails";
import EditTask from "./components/EditTask";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="dashboard" element={<Home />}>
            <Route path="add-task" element={<AddTask />} />
            <Route path="today-task" element={<ToadayTask />} />
            <Route path=":taskId" element={<ViewTaskDetails />} />
            <Route path="all-tasks" element={<AllTasks />} />
            <Route path="tasks/edit" element={<EditTask />} />
            <Route path="profile" element={<Profile />} />
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
