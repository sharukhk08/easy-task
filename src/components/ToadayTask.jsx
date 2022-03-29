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
import { useNavigate } from "react-router-dom";
import { useStoreUserData } from "../useStoreUserData";
import { useUserAuthProvider } from "../contexts/UserAuthProvider";

const ToadayTask = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const id = "2sfsa4";
  const { user } = useUserAuthProvider();

  const { getTodayTask, todayTasks, isTodayTaskLoading } = useStoreUserData({
    user,
  });

  useEffect(() => {
    getTodayTask();
  }, []);

  const ths = (
    <tr>
      <th>Project Name</th>
      <th>Hours Track</th>
      <th>Description</th>
      <th>Date</th>
      <th>Action</th>
    </tr>
  );
  console.log(todayTasks, "todayTasks");
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
          {console.log(element, "getTodayTask")}
          <span className="mx-5" onClick={() => navigate(`/dashboard/${id}`)}>
            <Eye />
          </span>
          <span onClick={() => navigate("/dashboard/tasks/edit")}>
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
              Life is like an npm install – you never know what you are going to
              get.
            </Blockquote>
          </Center>
        )}
      </Container>
    </>
  );
};

export default ToadayTask;
