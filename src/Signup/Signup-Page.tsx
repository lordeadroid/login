import {
  Box,
  Button,
  Flex,
  Group,
  PasswordInput,
  Radio,
  RadioGroup,
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
            <TextInput
              placeholder="number (optional)"
              size="xl"
              {...form.getInputProps("number")}
            />
            <PasswordInput
              placeholder="password"
              size="xl"
              {...form.getInputProps("password")}
            />
            <RadioGroup
              label="Nationality"
              size="md"
              {...form.getInputProps("nationality")}
            >
              <Group>
                <Radio value="indian" label="Indian" />
                <Radio value="other" label="Other" />
              </Group>
            </RadioGroup>
          </Flex>
          <Button type="submit" size="lg">
            Submit
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default SignupPage;
