import {
  Box,
  Button,
  Flex,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { TSignUpPage } from "../types";
import styles from "./Signup.module.css";

const SignupPage: TSignUpPage = ({ form, handleSubmit }) => {
  return (
    <Flex
      align={"center"}
      justify={"center"}
      h={"100vh"}
      direction={"column"}
      gap={"5rem"}
    >
      <Box>
        <Text size="5rem" fw={900}>
          antstack
        </Text>
      </Box>
      <Box>
        <form onSubmit={form.onSubmit(handleSubmit)} className={styles.form}>
          <Flex direction={"column"} gap={"0.75rem"}>
            <TextInput
              placeholder="username"
              size="xl"
              {...form.getInputProps("username")}
            />
            <TextInput
              placeholder="email"
              size="xl"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              placeholder="password"
              size="xl"
              {...form.getInputProps("password")}
            />
          </Flex>
          <Button type="submit" size="md">
            Submit
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default SignupPage;
