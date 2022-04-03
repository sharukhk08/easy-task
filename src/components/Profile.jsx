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
import { easytasksService } from "../easytask.service";
import { useNotifications } from "@mantine/notifications";

const schema = z.object({
  name: z.string().min(2, { message: "Name should have at least 2 letters" }),
  email: z.string(),
  password: z
    .string()
    .min(8, { message: "Password should have at least 8 letters!" }),
});
const Profile = () => {
  const { user, logout } = useUserAuthProvider();
  const notifications = useNotifications();

  const { userDetails } = useStoreUserData({
    user,
  });

  const [isLoading, setLoading] = React.useState(false);
  const [isProfileUpdate, setProfileUpdate] = React.useState(false);
  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      name: "",
      email: userDetails ? userDetails.email.toString() : "",
      password: "",
      profession: "",
    },
  });

  const theme = useMantineTheme();
  const navigate = useNavigate();

  const handleUpdateProfile = async (values) => {
    setLoading(true);
    const updateduserDetailsData = {
      email: userDetails.email,
      password: userDetails.password,
      name: userDetails.name,
      profession: values.profession,
    };
    await easytasksService.updateUserDetails(
      userDetails._id,
      updateduserDetailsData
    );
    setLoading(false);
    notifications.showNotification({
      color: "#fd7e14",
      title: "Profile Updated Successfully",
      message: "click to close",
      autoClose: true,
    });
    setProfileUpdate(false);
  };

  const { name, profession } =
    userDetails && userDetails
      ? userDetails
      : { name: "easy Task", email: "easytask@gmail.com" };
  const splitNameBySpace = name ? name.split(" ") : "";
  const firstChar = splitNameBySpace ? splitNameBySpace[0].charAt(0) : "";
  const SecondChar = splitNameBySpace ? splitNameBySpace[1].charAt(0) : "";

  return (
    <>
      <Container px="xs" mt="lg">
        <Group position="apart" align="start">
          <Group>
            <Avatar color="#FF922B" radius={60} size={120}>
              {firstChar}
              {SecondChar}
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
                {name}
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
                {profession}
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

        {isProfileUpdate ? (
          <Box>
            <form
              className="mt-20"
              onSubmit={form.onSubmit((values) => handleUpdateProfile(values))}
            >
              <TextInput
                required
                label="Email"
                disabled
                width="100%"
                {...form.getInputProps("email")}
                placeholder="You can't change your email"
              />
              <TextInput
                required
                label="Name"
                mt="sm"
                value={userDetails && userDetails.name}
                {...form.getInputProps("name")}
              />
              <TextInput
                required
                label="Profession"
                mt="sm"
                value={userDetails && userDetails.profession}
                {...form.getInputProps("profession")}
              />
              {/* input for password  */}
              <TextInput
                required
                label="Password"
                mt="sm"
                type="password"
                value={userDetails && userDetails.password}
                {...form.getInputProps("password")}
              />

              <Group position="right" mt="xl">
                <Button type="submit" radius={3}>
                  {isLoading ? (
                    <Loader color="white" variant="dots" />
                  ) : (
                    "Update"
                  )}
                </Button>
                <Button radius={3} onClick={() => setProfileUpdate(false)}>
                  Go Back
                </Button>
              </Group>
            </form>
          </Box>
        ) : (
          <Box>
            <form
              className="mt-20"
              onSubmit={form.onSubmit((values) => handleUpdateProfile(values))}
            >
              <TextInput
                required
                label="Email"
                disabled
                width="100%"
                {...form.getInputProps("email")}
                placeholder={userDetails && userDetails.email}
              />
              <TextInput
                required
                label="Name"
                disabled
                mt="sm"
                {...form.getInputProps("name")}
                placeholder={userDetails && userDetails.name}
              />
              <TextInput
                required
                label="Profession"
                disabled
                mt="sm"
                {...form.getInputProps("profession")}
                placeholder={userDetails && userDetails.profession}
              />
              {/* input for password  */}
              <TextInput
                required
                label="Password"
                disabled
                mt="sm"
                type="password"
                {...form.getInputProps("password")}
                placeholder={userDetails && userDetails.password}
              />

              <Group position="right" mt="xl">
                <Button
                  mt="xl"
                  radius={3}
                  onClick={() => setProfileUpdate(true)}
                >
                  Click here to update your profile
                </Button>
              </Group>
            </form>
          </Box>
        )}
      </Container>
    </>
  );
};

export default Profile;
