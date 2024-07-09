import {
  Button,
  Flex,
  Group,
  PasswordInput,
  Radio,
  RadioGroup,
  Text,
  TextInput,
} from "@mantine/core";
import { THandleSubmit, TReact, TSignupFormData } from "../types";
import {
  EMPTYSTRING,
  INITIALSIGNUPFORM,
  NOTIFICATION_MSG,
  NOTIFICATION_TYPE,
  PATH,
} from "../utils/constant";
import { UseFormReturnType, useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import { signupFormValidator } from "../utils/form-validator";
import { useEffect } from "react";
import { useDatabaseStore, useLoginStore } from "../utils/use-store";
import { hashString, notifyUser, userExist } from "../utils/utils";

const SignupPage: TReact = () => {
  const navigate = useNavigate();

  const username = useLoginStore((state) => state.username);
  const updateUsername = useLoginStore((state) => state.updateUsername);

  const entries = useDatabaseStore((state) => state.entries);
  const addEntry = useDatabaseStore((state) => state.addEntry);

  useEffect(() => {
    if (username !== EMPTYSTRING) {
      navigate(PATH.home);
    }
  });

  const form: UseFormReturnType<TSignupFormData> = useForm({
    mode: "uncontrolled",
    initialValues: INITIALSIGNUPFORM,
    validate: signupFormValidator,
  });

  const handleSubmit: THandleSubmit = async (values) => {
    const { username, password } = values;

    if (userExist(entries, username)) {
      notifyUser(NOTIFICATION_TYPE.signup, NOTIFICATION_MSG.signup.username);
      return;
    }

    values.password = await hashString(password);

    notifyUser(NOTIFICATION_TYPE.signup, NOTIFICATION_MSG.signup.success);
    updateUsername(username); // add user in login-store
    addEntry(values); // add user in db-store
    navigate(PATH.home);
  };

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
          <Text>Already have an account?</Text>
          <Link to={PATH.login}>Login</Link>
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
            <TextInput
              size="lg"
              label="Email"
              placeholder="email"
              {...form.getInputProps("email")}
            />
            <TextInput
              size="lg"
              label="Number"
              placeholder="number (optional)"
              {...form.getInputProps("number")}
            />
            <PasswordInput
              size="lg"
              label="Password"
              placeholder="password"
              {...form.getInputProps("password")}
            />
            <RadioGroup
              size="md"
              label="Nationality"
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
      </Flex>
    </Flex>
  );
};

export default SignupPage;
