import React, { useEffect } from "react";
import {
  Blockquote,
  Center,
  Container,
  Loader,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Table } from "@mantine/core";
import { Eye, Pencil } from "tabler-icons-react";
import DeleteModal from "./common/DeleteModal";
import { Link, useNavigate } from "react-router-dom";
import { useStoreUserData } from "../useStoreUserData";
import { useUserAuthProvider } from "../contexts/UserAuthProvider";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

const ToadayTask = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { user } = useUserAuthProvider();

  const { setTodayTasks, setTodayTaskLoading, todayTasks, isTodayTaskLoading } =
    useStoreUserData({
      user,
    });

  useEffect(() => {
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

    getTodayTask();
  }, [user, setTodayTaskLoading, setTodayTasks]);

  const ths = (
    <tr>
      <th>Project Name</th>
      <th>Hours Track</th>
      <th>Description</th>
      <th>Date</th>
      <th>Action</th>
    </tr>
  );

  const rows =
    todayTasks &&
    todayTasks.length > 0 &&
    todayTasks.map((element, index) => (
      <tr key={index}>
        <td>{element.projectName}</td>
        <td>{element.hours}</td>
        <td>{element.description}</td>
        <td>{new Date(element.time.seconds * 1000).toDateString()}</td>
        <td>
          <DeleteModal />
          <span
            className="mx-5"
            onClick={() => navigate(`/dashboard/${element.docId}`)}
          >
            <Eye />
          </span>
          <span
            onClick={() => navigate(`/dashboard/tasks/edit/${element.docId}`)}
          >
            <Pencil />
          </span>
        </td>
      </tr>
    ));

  return (
    <>
      <Container>
        <Title
          mb="lg"
          sx={{
            fontWeight: "bold",
            color:
              theme.colorScheme === "dark"
                ? theme.colors.gray[5]
                : theme.colors.dark[10],
            fontSize: 32,
          }}
          order={1}
        >
          Today's Task List
        </Title>
        {isTodayTaskLoading ? (
          <Center my={200}>
            <Loader />
          </Center>
        ) : todayTasks.length > 0 ? (
          <Table highlightOnHover>
            <thead>{ths}</thead>
            <tbody>{rows}</tbody>
          </Table>
        ) : (
          <Center>
            <Blockquote cite="– Forrest Gump">
              No Today Task Found.{" "}
              <Link className="link-style-a" to="/dashboard/add-task">
                Click here to create one.
              </Link>
            </Blockquote>
          </Center>
        )}
      </Container>
    </>
  );
};

export default ToadayTask;
