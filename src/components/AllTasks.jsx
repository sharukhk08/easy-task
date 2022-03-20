import React from "react";
import {
  Blockquote,
  Center,
  Container,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Table } from "@mantine/core";
import { Eye, Pencil } from "tabler-icons-react";
import DeleteModal from "./common/DeleteModal";
import { useNavigate } from "react-router-dom";

const AllTasks = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const id = "2sfsa4";

  const elements = [
    {
      projectname: "Alder mages",
      hourstrack: 1,
      description: "Change Logo",
      date: "Mar 19 2022",
    },
    {
      projectname: "Alder mages",
      hourstrack: 1,
      description: "Change Logo",
      date: "Mar 19 2022",
    },
    {
      projectname: "Alder mages",
      hourstrack: 1,
      description: "Change Logo",
      date: "Mar 19 2022",
    },
    {
      projectname: "Alder mages",
      hourstrack: 1,
      description: "Change Logo",
      date: "Mar 19 2022",
    },
  ];
  const ths = (
    <tr>
      <th>Project Name</th>
      <th>Hours Track</th>
      <th>Description</th>
      <th>Date</th>
      <th>Action</th>
    </tr>
  );

  const rows = elements.map((element, index) => (
    <tr key={index}>
      <td>{element.projectname}</td>
      <td>{element.hourstrack}</td>
      <td>{element.description}</td>
      <td>{element.date}</td>
      <td>
        <DeleteModal />

        <span className="mx-5" onClick={() => navigate(`/dashboard/${id}`)}>
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
        {elements.length > 0 ? (
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
