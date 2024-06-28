import { Button, Flex, PasswordInput, Text, TextInput } from "@mantine/core";
import { TLoginFormData, TReact } from "../types";
import { EMPTYSTRING, ERROR, INITIALLOGINFORM, PATH } from "../utils/constant";
import { loginFormValidator } from "../utils/form-validator";
import { UseFormReturnType, useForm } from "@mantine/form";
import styles from "../style.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDatabaseStore, useLoginStore } from "../utils/use-store";
import { hashString, isVerifiedUser, userExist } from "../utils/utils";

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
      alert(ERROR.login.username);
      return;
    }

    const hashedPassword: string = await hashString(password);

    if (!isVerifiedUser(entries, username, hashedPassword)) {
      alert(ERROR.login.password);
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
    <Flex w={"80vw"} h={"85vh"} justify={"center"} align={"center"} m={"auto"}>
      <Flex
        justify={"center"}
        align={"center"}
        direction={"column"}
        w={"40vw"}
        p={"4rem"}
        gap={"1rem"}
        bg={"white"}
        style={{
          boxShadow: "0px 0px 10px white, 0px 0px 20px gray",
        }}
      >
        <Text size="2rem" fw={700}>
          Welcome to AntStack
        </Text>
        <Flex gap={"1rem"}>
          <Text>Don't have an account?</Text>
          <Link to={PATH.signup}>Signup</Link>
        </Flex>
        <form onSubmit={form.onSubmit(handleSubmit)} className={styles.form}>
          <Flex direction={"column"} gap={"1rem"} p={"xl"}>
            <TextInput
              w="25rem"
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
