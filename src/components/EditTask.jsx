import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { getDoc, doc } from "firebase/firestore";
import { useParams } from "react-router-dom";
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
  Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useNotifications } from "@mantine/notifications";
import { easytasksService } from "../easytask.service";
import { useUserAuthProvider } from "../contexts/UserAuthProvider";

const schema = z.object({
  projectName: z.string(),
  // hours: z.number().positive({ message: "Hours should be positive" }),
  hours: z.string(),
  description: z.string(),
});

const EditTask = () => {
  const [taskDetails, setTaskDetails] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { time } = taskDetails ? taskDetails : "";
  // const { seconds } = time ? time : "";
  const [timeValue, onChange] = useState(new Date());

  console.log(new Date(), "new Date()");
  console.log(
    new Date(time && time.toDate()).toDateString(),
    "new Date().getTimezoneOffset()"
  );

  console.log(new Date(time && time.toDate()).toLocaleTimeString());
  console.log(taskDetails);
  let params = useParams();
  const theme = useMantineTheme();
  const notifications = useNotifications();
  const { user } = useUserAuthProvider();

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      projectName: "",
      hours: "",
      description: "",
    },
  });
  // GET TAKK DETAILS BY ID USING PARAMS
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

  useEffect(() => {
    if (taskDetails) {
      form.setValues({
        projectName: taskDetails.projectName,
        hours: taskDetails.hours,
        description: taskDetails.description,
      });
    }
  }, [taskDetails, form]);

  const handleUpdate = async (values) => {
    if (
      !values.projectName ||
      !values.hours ||
      !values.description ||
      !timeValue
    ) {
      notifications.showNotification("Please fill all the fields");
      return;
    }

    const tasksData = {
      projectName: values.projectName,
      hours: values.hours,
      description: values.description,
      time: timeValue,
      createdAt: taskDetails.createdAt,
      updatedAt: new Date(),
      userId: user.uid,
    };

    try {
      setLoading(true);
      await easytasksService.updateTask(params.taskId, tasksData);
      setLoading(false);
      notifications.showNotification({
        color: "#fd7e14",
        title: "Task updated successfully",
        message: "click to close",
        autoClose: true,
      });
      // null all the fields
      form.reset();
    } catch (error) {
      setLoading(false);
      console.log("catch", error);
      notifications.showNotification({
        color: "#fd7e14",
        title: "Failed to update task",
        message: "click to close",
        autoClose: true,
      });
    }
  };
  return (
    <>
      <Container size="sm" px="xs">
        <form onSubmit={form.onSubmit((values) => handleUpdate(values))}>
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
            Edit Your Task
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
                "Edit Task"
              )}
            </Button>
          </Group>
        </form>
      </Container>
    </>
  );
};

export default EditTask;
