import backgroundImage from "../assets/background.avif";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseFormReturnType, useForm } from "@mantine/form";
import { signupFormValidator } from "../utils/form-validator";
import { THandleSubmit, TSignupFormData } from "../types";
import { hashString, notifyUser, userExist } from "../utils/utils";
import { useDatabaseStore, useLoginStore } from "../utils/use-store";
import {
  EMPTYSTRING,
  INITIALSIGNUPFORM,
  NOTIFICATION_MSG,
  NOTIFICATION_TYPE,
  PATH,
  SIZE,
} from "../utils/constant";
import {
  Button,
  Flex,
  Group,
  Image,
  PasswordInput,
  Radio,
  RadioGroup,
  Text,
  TextInput,
} from "@mantine/core";

const SignupPage = () => {
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
    <Flex gap={SIZE.large}>
      <Flex
        direction={"column"}
        gap={"4rem"}
        align={"center"}
        p={SIZE.extraLarge}
      >
        <Text size="2.5rem" fw={700}>
          Welcome to AntStack
        </Text>

        <form
          onSubmit={form.onSubmit(handleSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "3rem",
          }}
        >
          <Flex direction={"column"} gap={SIZE.large}>
            <TextInput
              size={SIZE.medium}
              w={"24rem"}
              placeholder="username"
              {...form.getInputProps("username")}
            />
            <TextInput
              size={SIZE.medium}
              placeholder="email"
              {...form.getInputProps("email")}
            />
            <TextInput
              size={SIZE.medium}
              placeholder="number (optional)"
              {...form.getInputProps("number")}
            />
            <PasswordInput
              size={SIZE.medium}
              placeholder="password"
              {...form.getInputProps("password")}
            />
            <RadioGroup
              label="Nationality"
              {...form.getInputProps("nationality")}
            >
              <Group>
                <Radio value="indian" label="Indian" />
                <Radio value="other" label="Other" />
              </Group>
            </RadioGroup>
          </Flex>
          <Button type="submit" size={SIZE.medium} w={"8rem"}>
            Submit
          </Button>
        </form>

        <Flex gap={SIZE.extraSmall}>
          <Text>Already have an account?</Text>
          <Link to={PATH.login}>Login</Link>
        </Flex>
      </Flex>
      <Image src={backgroundImage} alt="signup page" />
    </Flex>
  );
};

export default SignupPage;
