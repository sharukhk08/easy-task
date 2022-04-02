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

const schema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password should have at least 8 letters!" }),
});

function Login() {
  const { login } = useUserAuthProvider();
  const notifications = useNotifications();

  const [isLoading, setLoading] = React.useState(false);

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values) => {
    if (!values.email || !values.password) {
      notifications.showNotification({
        color: "#fd7e14",
        title: "Please enter email and password",
        message: "You cannot login without email and password",
        autoClose: false,
      });
      return;
    }
    try {
      setLoading(true);
      await login(values.email, values.password);
      setLoading(false);
      history("/dashboard/add-task");
    } catch (error) {
      setLoading(false);
      notifications.showNotification({
        color: "#fd7e14",
        title: "Email or password is incorrect",
        message: "Please try again",
        autoClose: false,
      });
    }
  };
  const history = useNavigate();
  const theme = useMantineTheme();
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
              maxWidth: "600px",
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
                Login To Easy Task
              </Title>
              <TextInput
                required
                label="Email"
                placeholder="easytask@mail.com"
                {...form.getInputProps("email")}
              />
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
                    "Login"
                  )}
                </Button>
              </Group>
              <Text className="link-style" color="gray" align="center" mt="xs">
                For Register Click here to
                <Link to={"/signup"}> Sign Up</Link>
              </Text>
            </form>
          </Box>
        </Center>
      </div>
    </>
  );
}

export default Login;
