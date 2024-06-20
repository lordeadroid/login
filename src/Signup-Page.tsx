import { Button, Flex, PasswordInput, TextInput } from "@mantine/core";
import { TSignUpPage } from "./types";

const SignupPage: TSignUpPage = ({ form, handleSubmit }) => {
  return (
    <Flex
      justify={"center"}
      align={"center"}
      gap={12}
      h={"100vh"}
      direction={"column"}
    >
      <div className="logo">
        <h1>antstack</h1>
      </div>
      <form onSubmit={form.onSubmit(handleSubmit)} className="form">
        <div className="input-container">
          <TextInput
            placeholder="username"
            className="input-box"
            variant="unstyled"
            size="xl"
            key={form.key("username")}
            {...form.getInputProps("username")}
          />
          <TextInput
            placeholder="email"
            className="input-box"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            placeholder="password"
            className="input-box"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
        </div>
        <Button type="submit" className="button">
          Submit
        </Button>
      </form>
    </Flex>
  );
};

export default SignupPage;
