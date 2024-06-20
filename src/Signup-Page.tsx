import { Button, Flex, PasswordInput, Text, TextInput } from "@mantine/core";
import { TSignUpPage } from "./types";

const SignupPage: TSignUpPage = ({ form, handleSubmit }) => {
  return (
    <Flex align={"center"} justify={"center"}>
      <Flex>
        <Text>antstack</Text>
      </Flex>
      <Flex>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Flex>
            <TextInput
              placeholder="username"
              {...form.getInputProps("username")}
            />
            <TextInput placeholder="email" {...form.getInputProps("email")} />
            <PasswordInput
              placeholder="password"
              {...form.getInputProps("password")}
            />
          </Flex>
          <Button type="submit">Submit</Button>
        </form>
      </Flex>
    </Flex>
  );
};

export default SignupPage;
