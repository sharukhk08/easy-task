import React from "react";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import {
  TextInput,
  Button,
  Box,
  Group,
  Loader,
  Text,
  Center,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuthProvider } from "../contexts/UserAuthProvider";
import { useNotifications } from "@mantine/notifications";
import { easytasksService } from "../easytask.service";
const schema = z.object({
  name: z.string().min(2, { message: "Name should have at least 2 letters" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password should have at least 8 letters!" }),
});

const SignUp = () => {
  const { signUp } = useUserAuthProvider();
  const notifications = useNotifications();

  const history = useNavigate();
  const theme = useMantineTheme();
  const [isLoading, setLoading] = React.useState(false);
  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values) => {
    if (!values.name || !values.email || !values.password) {
      notifications.error("Please fill all the fields");
      return;
    }
    try {
      setLoading(true);

      await signUp(values.email, values.password);
      const usersData = {
        name: values.name,
        email: values.email,
        profession: "",
        password: values.password,
      };
      await easytasksService.addNewUser(usersData);

      setLoading(false);
      history("/dashboard/add-task");
      notifications.showNotification({
        color: "#fd7e14",
        title: "You've successfully signed up",
        message: "Check your email to verify your account",
        autoClose: false,
      });
    } catch (error) {
      setLoading(false);

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
      <div className="login-wrapper">
        <Center
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.orange[0],
            width: "100%",
            height: "100%",
          })}
          style={{ width: "100%", height: "100%" }}
        >
          <Box
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark" ? theme.colors.dark[3] : "white",
              maxWidth: "500px",
              padding: "3rem",
              borderRadius: "10px",
            })}
          >
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
                Welcome To Easy Task
              </Title>
              <TextInput
                required
                label="Email"
                placeholder="easytask@mail.com"
                {...form.getInputProps("email")}
              />
              <TextInput
                required
                label="Name"
                placeholder="Easy Task"
                mt="sm"
                {...form.getInputProps("name")}
              />
              {/* input for password  */}
              <TextInput
                required
                label="Password"
                placeholder="********"
                mt="sm"
                type="password"
                {...form.getInputProps("password")}
              />
              <Group position="right" mt="xl">
                <Button type="submit" radius={3}>
                  {isLoading ? (
                    <Loader color="white" variant="dots" />
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </Group>

              <Text className="link-style" color="gray" align="center" mt="xs">
                Already have an account <Link to={"/"}>Login</Link>
              </Text>
            </form>
          </Box>
        </Center>
      </div>
    </>
  );
};

export default SignUp;
