import {
  Title,
  useMantineTheme,
  Container,
  Group,
  Text,
  Box,
  Button,
  Loader,
} from "@mantine/core";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase-config";
import { getDoc, doc } from "firebase/firestore";

const ViewTaskDetails = () => {
  const [taskDetails, setTaskDetails] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const theme = useMantineTheme();
  let params = useParams();
  const { time, projectName, hours, description } =
    taskDetails && taskDetails ? taskDetails : {};
  useEffect(() => {
    setLoading(true);

    const getCollection = async () => {
      const taskSnapshot = await getDoc(doc(db, "tasks", params.taskId));
      if (taskSnapshot.exists()) {
        const detailsdata = {
          docId: taskSnapshot.id,
          ...taskSnapshot.data(),
        };

        setTaskDetails(detailsdata);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    getCollection();
  }, [params.taskId]);

  return (
    <>
      <Container size="sm">
        <Group align="center" position="apart">
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
            Task Details
          </Title>

          <Button onClick={() => navigate(-1)} radius={3}>
            Go Back
          </Button>
        </Group>

        {isLoading || taskDetails === {} ? (
          <Loader />
        ) : (
          <Box>
            <Group>
              <Text
                sx={{
                  fontWeight: "semibold",
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.gray[5]
                      : theme.colors.dark[10],
                  fontSize: 20,
                }}
              >
                Project Name
              </Text>{" "}
              :
              <Text
                sx={{
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.gray[5]
                      : theme.colors.dark[10],
                }}
              >
                {projectName}
              </Text>
            </Group>
            <Group>
              <Text
                sx={{
                  fontWeight: "semibold",
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.gray[5]
                      : theme.colors.dark[10],
                  fontSize: 20,
                }}
              >
                Hours Track
              </Text>
              :
              <Text
                sx={{
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.gray[5]
                      : theme.colors.dark[10],
                }}
              >
                {hours}
              </Text>
            </Group>
            <Group>
              <Text
                sx={{
                  fontWeight: "semibold",
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.gray[5]
                      : theme.colors.dark[10],
                  fontSize: 20,
                }}
              >
                Description
              </Text>
              :
              <Text
                sx={{
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.gray[5]
                      : theme.colors.dark[10],
                }}
              >
                {description}
              </Text>
            </Group>
            <Group>
              <Text
                sx={{
                  fontWeight: "semibold",
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.gray[5]
                      : theme.colors.dark[10],
                  fontSize: 20,
                }}
              >
                Date
              </Text>
              :
              <Text
                sx={{
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.gray[5]
                      : theme.colors.dark[10],
                }}
              >
                {time && time.seconds
                  ? new Date(time.seconds * 1000).toDateString()
                  : "28 Feb 1999"}
              </Text>
            </Group>
          </Box>
        )}
      </Container>
    </>
  );
};

export default ViewTaskDetails;
