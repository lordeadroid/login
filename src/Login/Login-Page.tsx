import { Button, Flex, PasswordInput, Text, TextInput } from "@mantine/core";
import { TLoginFormData, TReact } from "../types";
import { EMPTYSTRING, ERROR, INITIALLOGINFORM, PATH } from "../utils/constant";
import { loginFormValidator } from "../utils/form-validator";
import { UseFormReturnType, useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDatabaseStore, useLoginStore } from "../utils/use-store";
import { hashString, isVerifiedUser, userExist } from "../utils/utils";
import { notifications } from "@mantine/notifications";

const LoginPage: TReact = () => {
  const navigate = useNavigate();

  const username = useLoginStore((state) => state.username);
  const updateUsername = useLoginStore((state) => state.updateUsername);

  const entries = useDatabaseStore((state) => state.entries);

  useEffect(() => {
    if (username !== EMPTYSTRING) {
      navigate(PATH.home);
    }
  });

  const handleSubmit = async (values: TLoginFormData) => {
    const { username, password } = values;

    if (!userExist(entries, username)) {
      notifications.show({
        title: "Login Error",
        message: ERROR.login.username,
      });
      return;
    }

    const hashedPassword: string = await hashString(password);

    if (!isVerifiedUser(entries, username, hashedPassword)) {
      notifications.show({
        title: "Login Error",
        message: ERROR.login.password,
      });
      return;
    }

    updateUsername(username); // add user in login-store
    navigate(PATH.home);
  };

  const form: UseFormReturnType<TLoginFormData> = useForm({
    mode: "uncontrolled",
    initialValues: INITIALLOGINFORM,
    validate: loginFormValidator,
  });

  return (
    <Flex justify={"center"}>
      <Flex
        align={"center"}
        direction={"column"}
        bg={"white"}
        p={"xl"}
        gap={"lg"}
        style={{
          boxShadow: "0 0 0.5rem white, 0 0 1rem gray",
          borderRadius: "0.5rem",
        }}
      >
        <Text size="3.5vh" fw={700}>
          Welcome to AntStack
        </Text>

        <Flex gap={"xs"}>
          <Text>Don't have an account?</Text>
          <Link to={PATH.signup}>Signup</Link>
        </Flex>

        <form
          onSubmit={form.onSubmit(handleSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "4vh",
          }}
        >
          <Flex direction={"column"} gap={"lg"} p={"lg"}>
            <TextInput
              size="lg"
              label="Username"
              placeholder="username"
              {...form.getInputProps("username")}
            />
            <PasswordInput
              size="lg"
              label="Password"
              placeholder="password"
              {...form.getInputProps("password")}
            />
          </Flex>
          <Button type="submit" size="lg">
            Submit
          </Button>
        </form>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
