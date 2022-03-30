import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase-config";

export function useStoreUserData({ user }) {
  const [userDetails, setUserDetails] = useState(null);
  const [todayTasks, setTodayTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAllTaskLoading, setAllTaskLoading] = useState(false);
  const [isTodayTaskLoading, setTodayTaskLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      if (user) {
        const q = query(
          collection(db, "users"),
          where("email", "==", user.email)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUserDetails(doc.data());
          setLoading(false);
        });
      }
    };
    getData();
  }, []);

  // GET ONLY TODAY TASKS FROM FIREBASE
  const getTodayTask = async () => {
    console.log("run");
    setTodayTaskLoading(true);
    const q = query(collection(db, "tasks"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const task = doc.data();
      if (user) {
        console.log(user);
        if (task.userId === user.uid) {
          const today = new Date();
          const taskDate = new Date(task.createdAt.seconds * 1000);
          if (
            today.getDate() === taskDate.getDate() &&
            today.getMonth() === taskDate.getMonth()
          ) {
            setTodayTasks((prevState) => [...prevState, task]);
            setTodayTaskLoading(false);
          } else {
            setTodayTaskLoading(false);
          }
        }
      }
    });
  };

  // GET ONLY TODAY TASKS FROM FIREBASE
  const getAllTask = async () => {
    setAllTaskLoading(true);
    const q = query(collection(db, "tasks"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const task = doc.data();
      if (user) {
        if (task.userId === user.uid) {
          setAllTasks((prevState) => [...prevState, task]);
          setAllTaskLoading(false);
        } else {
          setAllTaskLoading(false);
        }
      }
    });
  };

  return {
    isAllTaskLoading,
    getAllTask,
    allTasks,
    isTodayTaskLoading,
    getTodayTask,
    todayTasks,
    userDetails,
    loading,
  };
}
