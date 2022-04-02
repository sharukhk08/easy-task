import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase-config";
import { easytasksService } from "./easytask.service";

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
          const userId = doc.id;
          setUserDetails({ ...doc.data(), _id: userId });
          setLoading(false);
        });
      }
    };
    getData();
  }, [user]);

  // DELETE TODAY TASKS FROM FIRESTORE
  const deleteTodayTask = async (id) => {
    console.log(id);
    console.log(allTasks);
    const filteredTasks = allTasks.filter((task) => task.docId !== id);
    console.log(filteredTasks);
    setAllTasks(filteredTasks);

    await easytasksService.deleteTask(id);
  };

  return {
    setAllTasks,
    deleteTodayTask,
    setAllTaskLoading,
    isAllTaskLoading,
    allTasks,
    isTodayTaskLoading,
    setTodayTaskLoading,
    todayTasks,
    setTodayTasks,
    userDetails,
    loading,
  };
}
