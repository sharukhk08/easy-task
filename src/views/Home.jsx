import { useEffect } from "react";
import Dashboard from "../components/Dashboard";
import { useUserAuthProvider } from "../contexts/UserAuthProvider";
import { easytasksService } from "../easytask.service";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const Home = () => {
  const { user } = useUserAuthProvider();
  console.log(user);
  useEffect(() => {
    console.log(user.uid);
    const getUsersDetails = async () => {
      if (user) {
        const userSnapshot = await getDoc(doc(db, "users", user.uid));
        if (userSnapshot.exists()) {
          const data = [{ ...userSnapshot.data() }];
          console.log(data);
        } else {
          console.log("no data");
        }
      }
    };
    getUsersDetails();
  }, [user]);

  return (
    <>
      <div className="main-section">
        <Dashboard />
      </div>
    </>
  );
};

export default Home;
