import Dashboard from "../components/Dashboard";
import { useUserAuthProvider } from "../contexts/UserAuthProvider";
import { useStoreUserData } from "../useStoreUserData";

const Home = () => {
  const { user } = useUserAuthProvider();

  const { userDetails } = useStoreUserData({ user });

  return (
    <>
      <div className="main-section">
        <Dashboard userDetails={userDetails} />
      </div>
    </>
  );
};

export default Home;
