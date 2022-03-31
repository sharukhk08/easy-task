import React, { useEffect } from "react";
import {
  Blockquote,
  Center,
  Container,
  Title,
  useMantineTheme,
  Loader,
} from "@mantine/core";
import { Table } from "@mantine/core";
import { Eye, Pencil } from "tabler-icons-react";
import DeleteModal from "./common/DeleteModal";
import { useNavigate } from "react-router-dom";

import { useStoreUserData } from "../useStoreUserData";
import { useUserAuthProvider } from "../contexts/UserAuthProvider";
const AllTasks = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { user } = useUserAuthProvider();

  const { getAllTask, allTasks, isAllTaskLoading, deleteTodayTask } =
    useStoreUserData({
      user,
    });

  useEffect(() => {
    getAllTask();
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

  const rows = allTasks.map((element, index) => (
    <tr key={index}>
      <td>{element.projectName}</td>
      <td>{element.hours}</td>
      <td>{element.description}</td>
      <td>{new Date(element.time.seconds * 1000).toDateString()}</td>
      <td>
        <DeleteModal id={element.docId} deleteTodayTask={deleteTodayTask} />

        <span
          className="mx-5"
          onClick={() => navigate(`/dashboard/${element.docId}`)}
        >
          <Eye />
        </span>
        <span>
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
          All Tasks List
        </Title>
        {isAllTaskLoading ? (
          <Center my={200}>
            <Loader />
          </Center>
        ) : allTasks.length > 0 ? (
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

export default AllTasks;
