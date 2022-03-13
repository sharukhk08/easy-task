import React from "react";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { TextInput, Button, Box, Group, Loader } from "@mantine/core";

const schema = z.object({
  name: z.string().min(2, { message: "Name should have at least 2 letters" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password should have at least 8 letters!" }),
});

function Login() {
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

  return (
    <div>
      <Box className="login-wrapper" sx={{ maxWidth: 400 }} m="auto">
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
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
            <Button type="submit">
              {isLoading ? <Loader color="white" variant="dots" /> : "Submit"}{" "}
            </Button>
          </Group>
        </form>
      </Box>
    </div>
  );
}

export default Login;
