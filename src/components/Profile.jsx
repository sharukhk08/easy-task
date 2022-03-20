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

const schema = z.object({
  name: z.string().min(2, { message: "Name should have at least 2 letters" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password should have at least 8 letters!" }),
});
const Profile = () => {
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
    console.log(values);
    setLoading(true);
  };
  const theme = useMantineTheme();

  return (
    <>
      <Container px="xs" mt="lg">
        <Group position="apart" align="start">
          <Group>
            <Avatar color="#FF922B" radius={60} size={120}>
              MK
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
              <Text>Front End Developer</Text>
            </Group>
          </Group>
          <Menu>
            <Menu.Item disabled icon={<Logout size={14} />}>
              LOGOUT
            </Menu.Item>
          </Menu>
        </Group>

        <Box maxWidth={100}>
          <form
            className="mt-20"
            onSubmit={form.onSubmit((values) => handleSubmit(values))}
          >
            <TextInput
              required
              label="Email"
              disabled
              placeholder="easytask@mail.com"
              width="100%"
            />
            <TextInput required label="Name" placeholder="Easy Task" mt="sm" />
            <TextInput
              required
              label="Profession"
              placeholder="Front End Developer"
              mt="sm"
            />
            {/* input for password  */}
            <TextInput
              required
              label="Password"
              placeholder="********"
              mt="sm"
              type="password"
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
