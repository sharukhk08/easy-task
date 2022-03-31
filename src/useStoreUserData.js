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
  }, []);

  // GET ONLY TODAY TASKS FROM FIREBASE
  const getTodayTask = async () => {
    console.log("run");
    setTodayTaskLoading(true);
    const q = query(collection(db, "tasks"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const docId = doc.id;
      const task = { ...doc.data(), docId };
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
      const docId = doc.id;
      const task = { ...doc.data(), docId };
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
    deleteTodayTask,
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
