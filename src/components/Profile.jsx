import React from "react";
import {
  Container,
  Group,
  Title,
  Text,
  TextInput,
  Button,
  Loader,
  Box,
  useMantineTheme,
  Menu,
} from "@mantine/core";
import { Avatar } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { Logout } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";
import { useUserAuthProvider } from "../contexts/UserAuthProvider";
import { useStoreUserData } from "../useStoreUserData";

const schema = z.object({
  name: z.string().min(2, { message: "Name should have at least 2 letters" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password should have at least 8 letters!" }),
});
const Profile = () => {
  const { user, logout } = useUserAuthProvider();

  const { userDetails } = useStoreUserData({
    user,
  });

  console.log(userDetails);
  const [isLoading, setLoading] = React.useState(false);
  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      name: userDetails && userDetails.name,
      email: userDetails && userDetails.email,
      password: userDetails && userDetails.password,
      profession: userDetails && userDetails.profession,
    },
  });
  const handleSubmit = async (values) => {
    setLoading(true);
  };
  const theme = useMantineTheme();
  const navigate = useNavigate();

  return (
    <>
      <Container px="xs" mt="lg">
        <Group position="apart" align="start">
          <Group>
            <Avatar color="#FF922B" radius={60} size={120}>
              SK
            </Avatar>
            <Group direction="column">
              <Title
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
                Sharukh khan
              </Title>
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
                Front End Developer
              </Text>{" "}
            </Group>
          </Group>
          <Menu>
            <Menu.Item
              icon={<Logout size={14} />}
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              LOGOUT
            </Menu.Item>
          </Menu>
        </Group>

        <Box>
          <form
            className="mt-20"
            onSubmit={form.onSubmit((values) => handleSubmit(values))}
          >
            <TextInput
              required
              label="Email"
              disabled
              placeholder={userDetails && userDetails.email}
              width="100%"
              {...form.getInputProps("email")}
            />
            <TextInput
              required
              label="Name"
              placeholder={userDetails && userDetails.name}
              mt="sm"
              {...form.getInputProps("name")}
            />
            <TextInput
              required
              label="Profession"
              placeholder={userDetails && userDetails.profession}
              mt="sm"
              {...form.getInputProps("profession")}
            />
            {/* input for password  */}
            <TextInput
              required
              label="Password"
              placeholder={userDetails && userDetails.password}
              mt="sm"
              type="password"
              {...form.getInputProps("password")}
            />

            <Group position="right" mt="xl">
              <Button type="submit" radius={3}>
                {isLoading ? <Loader color="white" variant="dots" /> : "Update"}{" "}
              </Button>
            </Group>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Profile;
