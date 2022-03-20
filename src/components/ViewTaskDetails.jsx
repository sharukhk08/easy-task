import {
  Title,
  useMantineTheme,
  Container,
  Group,
  Text,
  Box,
  Button,
} from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

const ViewTaskDetails = () => {
  const navigate = useNavigate();
  const theme = useMantineTheme();

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
              Alder mages
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
              1 hour
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
              Add Qr code field mages
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
              March 20 2022
            </Text>
          </Group>
        </Box>
      </Container>
    </>
  );
};

export default ViewTaskDetails;
