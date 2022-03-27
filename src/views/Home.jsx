import AddTask from "../components/AddTask";
import Dashboard from "../components/Dashboard";
import { useUserAuthProvider } from "../contexts/UserAuthProvider";
import Private from "../Private";
import { useStoreUserData } from "../useStoreUserData";
import { Route } from "react-router-dom";

const Home = () => {
  const { user } = useUserAuthProvider();
  const { userDetails, loading } = useStoreUserData({ user });

  return (
    <>
      {/* <Private /> */}
      <div className="main-section">
        <Dashboard userDetails={userDetails} />
      </div>
    </>
  );
};

export default Home;
