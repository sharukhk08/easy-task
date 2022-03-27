import {
  AppShell,
  Navbar,
  Header,
  Group,
  ActionIcon,
  useMantineColorScheme,
  Box,
  UnstyledButton,
  Avatar,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "tabler-icons-react";
import { MainLinks } from "./MainLinks";
import { Sun, MoonStars } from "tabler-icons-react";
import { Outlet, useNavigate } from "react-router-dom";
import { Burger } from "@mantine/core";

function Dashboard({ userDetails }) {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [opened, setOpened] = useState(false);

  const history = useNavigate();
  return (
    <AppShell
      className={`${opened ? "sidebar-open" : ""}`}
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xs">
          <Navbar.Section grow mt="xs">
            <MainLinks />
          </Navbar.Section>
          <Navbar.Section>
            <User theme={theme} history={history} userDetails={userDetails} />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60}>
          <Group sx={{ height: "100%" }} px={20} position="apart">
            <Logo colorScheme={colorScheme} history={history} />
            <Burger opened={opened} onClick={() => setOpened((o) => !o)} />
            <ActionIcon
              variant="default"
              onClick={() => toggleColorScheme()}
              size={30}
            >
              {colorScheme === "dark" ? (
                <Sun size={16} />
              ) : (
                <MoonStars size={16} />
              )}
            </ActionIcon>
          </Group>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Outlet />
    </AppShell>
  );
}

export default Dashboard;

export const User = ({ theme, history, userDetails }) => {
  const { name, email } =
    userDetails && userDetails
      ? userDetails
      : { name: "easy Task", email: "easytask@gmail.com" };
  const splitNameBySpace = name ? name.split(" ") : "";
  console.log(splitNameBySpace);
  const firstChar = splitNameBySpace ? splitNameBySpace[0].charAt(0) : "";
  const SecondChar = splitNameBySpace ? splitNameBySpace[1].charAt(0) : "";
  console.log(firstChar, SecondChar);
  return (
    <Box
      onClick={() => history("/dashboard/profile")}
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      }}
    >
      <UnstyledButton
        sx={{
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        }}
      >
        <Group>
          <Avatar color="#FF922B" radius={60} size={50}>
            {firstChar}
            {SecondChar}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {name}
            </Text>
            <Text color="dimmed" size="xs">
              {email}
            </Text>
          </Box>

          {theme.dir === "ltr" ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </Group>
      </UnstyledButton>
    </Box>
  );
};

// HEADER LOGO
export function Logo({ colorScheme, history }) {
  return (
    <h1
      onClick={() => history("/dashboard/profile")}
      className={`cursor-pointer ${
        colorScheme === "dark" ? "dim-text-white" : "text-black"
      }`}
    >
      Easy Task
    </h1>
  );
}
