import { Button, Flex, PasswordInput, Text, TextInput } from "@mantine/core";
import { TLoginFormData, TReact } from "../types";
import { ERROR, INITIALLOGINFORM, PATH } from "../constant";
import { loginFormValidator } from "../form-validator";
import { UseFormReturnType, useForm } from "@mantine/form";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDatabaseStore, useLoginStore } from "../use-store";
import { hashString, isVerifiedUser, userExist } from "../utils";

const LoginPage: TReact = () => {
  const navigate = useNavigate();
  const updateUsername = useLoginStore((state) => state.updateUsername);
  const entries = useDatabaseStore((state) => state.entries);

  const handleSubmit = async (values: TLoginFormData) => {
    const { username, password } = values;

    if (!userExist(entries, username)) {
      alert(ERROR.login.username);
      return;
    }

    const hashedPassword = await hashString(password);

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
    <Flex align={"center"} justify={"center"} direction={"column"} p={"15rem"}>
      <form onSubmit={form.onSubmit(handleSubmit)} className={styles.form}>
        <Flex direction={"column"} gap={"0.75rem"} variant="filled">
          <TextInput
            placeholder="username"
            size="xl"
            {...form.getInputProps("username")}
          />
          <PasswordInput
            placeholder="password"
            size="xl"
            {...form.getInputProps("password")}
          />
        </Flex>
        <Button type="submit" size="lg">
          Submit
        </Button>
      </form>
      <Flex gap={"1rem"} p={"1rem"}>
        <Text>Don't have an account?</Text>
        <Link to={PATH.signup}>Signup</Link>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
