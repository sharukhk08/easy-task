import React, { useState } from "react";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import {
  TextInput,
  Button,
  Group,
  Loader,
  Textarea,
  Container,
  useMantineTheme,
  Text,
  Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useNotifications } from "@mantine/notifications";
import { easytasksService } from "../easytask.service";

const schema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password should have at least 8 letters!" }),
});

const AddTask = ({ heading }) => {
  const [isLoading, setLoading] = useState(false);
  const [timeValue, onChange] = useState(new Date());

  const theme = useMantineTheme();
  const notifications = useNotifications();

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      projectName: "",
      hours: "",
      description: "",
    },
  });

  const handleSubmit = async (values) => {
    console.log("handleSubmit");
    if (
      !values.projectName ||
      !values.hours ||
      !values.description ||
      !timeValue
    ) {
      notifications.error("Please fill all the fields");
      return;
    }

    const tasksData = {
      projectName: values.projectName,
      hours: values.hours,
      description: values.description,
      time: timeValue,
    };
    try {
      setLoading(true);
      await easytasksService.addTask(tasksData);
      console.log("try");
      setLoading(false);
      notifications.showNotification({
        color: "#fd7e14",
        title: "You've successfully signed up",
        message: "Check your email to verify your account",
        autoClose: false,
      });
    } catch (error) {
      setLoading(false);
      console.log("catch", error);

      notifications.showNotification({
        color: "#fd7e14",
        title: "Failed tp sign up",
        message: "Email already exists",
        autoClose: false,
      });
    }
  };

  return (
    <>
      <Container size="sm" px="xs">
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
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
            {heading ? heading : "Add Your Daily Tasks"}
          </Title>
          <TextInput
            required
            label="Project Name"
            placeholder="Enter Project Name"
            {...form.getInputProps("projectName")}
            radius={3}
          />
          <TextInput
            required
            label="How many hours you gave to complete this task?"
            placeholder="1 Hours"
            {...form.getInputProps("hours")}
            mt="sm"
            radius={3}
          />
          <Textarea
            label="What you have to do today. on this project?"
            placeholder="Add Description"
            autosize
            minRows={2}
            maxRows={5}
            mt="sm"
            radius={3}
            {...form.getInputProps("description")}
          />
          <DatePicker
            label="Pick Today's Date"
            placeholder="February 28, 1999"
            value={timeValue}
            onChange={onChange}
            mt="sm"
            radius={3}
          />
          <Group position="right" mt="xl">
            <Button type="submit" radius={3}>
              {isLoading ? (
                <Loader color="white" variant="dots" />
              ) : (
                "hola Task"
              )}
            </Button>
          </Group>
        </form>
      </Container>
    </>
  );
};

export default AddTask;
