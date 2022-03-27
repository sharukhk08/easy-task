import { Route, Routes } from "react-router-dom";
import ToadayTask from "./components/ToadayTask";
import AddTask from "./components/AddTask";
import AllTasks from "./components/AllTasks";
import NoRouteFound from "./components/common/NoRouteFound";
import Profile from "./components/Profile";
import ViewTaskDetails from "./components/ViewTaskDetails";
import EditTask from "./components/EditTask";

const Private = () => {
  return (
    <>
      <Routes>
        <Route path="today-task" element={<ToadayTask />} />
        <Route path=":taskId" element={<ViewTaskDetails />} />
        <Route path="all-tasks" element={<AllTasks />} />
        <Route path="tasks/edit" element={<EditTask />} />
        <Route path="profile" element={<Profile />} />
        <Route path="/dashboard" element={<NoRouteFound />} />
      </Routes>
    </>
  );
};

export default Private;
