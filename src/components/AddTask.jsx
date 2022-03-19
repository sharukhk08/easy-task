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
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";

const schema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password should have at least 8 letters!" }),
});

const AddTask = () => {
  const [isLoading, setLoading] = useState(false);
  const [value, onChange] = useState(new Date());

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      projectName: "",
      hours: "",
    },
  });

  const handleSubmit = async (values) => {
    console.log(values);
    setLoading(true);
  };
  const theme = useMantineTheme();

  return (
    <>
      <Container size="sm" px="xs">
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Group mb="lg">
            <Text
              sx={{
                fontWeight: "bold",
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.gray[5]
                    : theme.colors.dark[10],
                fontSize: 32,
              }}
            >
              Add Your Daily Tasks
            </Text>
          </Group>
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
          />
          <DatePicker
            label="Pick Today's Date"
            placeholder="February 28, 1999"
            value={value}
            onChange={onChange}
            mt="sm"
            radius={3}
          />
          <Group position="right" mt="xl">
            <Button type="submit" radius={3}>
              {isLoading ? <Loader color="white" variant="dots" /> : "Add Task"}
            </Button>
          </Group>
        </form>
      </Container>
    </>
  );
};

export default AddTask;
