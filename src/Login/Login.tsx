import { Button, Flex, PasswordInput, Text, TextInput } from "@mantine/core";
import { TFormData, TReact } from "../types";
import { INITIALFORMDATA } from "../constant";
import formValidator from "../form-validator";
import { UseFormReturnType, useForm } from "@mantine/form";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";

const Login: TReact = () => {
  const handleSubmit = () => {};
  const form: UseFormReturnType<TFormData> = useForm({
    mode: "uncontrolled",
    initialValues: INITIALFORMDATA,
    validate: formValidator,
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
        <Link to="/signup">Signup</Link>
      </Flex>
    </Flex>
  );
};

export default Login;
