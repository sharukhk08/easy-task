import React from "react";
import { Clock, List, Messages, SquarePlus } from "tabler-icons-react";
import { ThemeIcon, UnstyledButton, Group, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

function MainLink({ icon, color, label, route }) {
  const history = useNavigate();
  return (
    <UnstyledButton
      onClick={() => history(route)}
      sx={(theme) => ({
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
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  {
    icon: <SquarePlus size={16} />,
    color: "#fd7e14",
    label: "Add Task",
    route: "/dashboard/add-task",
  },
  {
    icon: <Clock size={16} />,
    color: "#fd7e14",
    label: "Today's Task",
    route: "/dashboard/today-task",
  },
  {
    icon: <List size={16} />,
    color: "#fd7e14",
    label: "All Tasks",
    route: "/dashboard/all-task",
  },
];

export function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
