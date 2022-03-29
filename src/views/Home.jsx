import AddTask from "../components/AddTask";
import Dashboard from "../components/Dashboard";
import { useUserAuthProvider } from "../contexts/UserAuthProvider";
import { useStoreUserData } from "../useStoreUserData";
import { Route } from "react-router-dom";

const Home = () => {
  const { user } = useUserAuthProvider();

  const { userDetails, loading } = useStoreUserData({ user });

  return (
    <>
      <div className="main-section">
        <Dashboard userDetails={userDetails} />
      </div>
    </>
  );
};

export default Home;
