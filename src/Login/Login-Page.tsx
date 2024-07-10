import backgroundImage from "../assets/background.avif";
import { useEffect } from "react";
import { TLoginFormData, TReact } from "../types";
import { Link, useNavigate } from "react-router-dom";
import { UseFormReturnType, useForm } from "@mantine/form";
import { loginFormValidator } from "../utils/form-validator";
import { useDatabaseStore, useLoginStore } from "../utils/use-store";
import {
  Button,
  Flex,
  Image,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import {
  hashString,
  isVerifiedUser,
  notifyUser,
  userExist,
} from "../utils/utils";
import {
  EMPTYSTRING,
  INITIALLOGINFORM,
  NOTIFICATION_MSG,
  NOTIFICATION_TYPE,
  PATH,
} from "../utils/constant";

const LoginPage: TReact = () => {
  const navigate = useNavigate();
  const entries = useDatabaseStore((state) => state.entries);
  const username = useLoginStore((state) => state.username);
  const updateUsername = useLoginStore((state) => state.updateUsername);

  useEffect(() => {
    if (username !== EMPTYSTRING) {
      navigate(PATH.home);
    }
  });

  const handleSubmit = async (values: TLoginFormData) => {
    const { username, password } = values;

    if (!userExist(entries, username)) {
      notifyUser(NOTIFICATION_TYPE.login, NOTIFICATION_MSG.login.username);
      return;
    }

    const hashedPassword: string = await hashString(password);
    if (!isVerifiedUser(entries, username, hashedPassword)) {
      notifyUser(NOTIFICATION_TYPE.login, NOTIFICATION_MSG.login.password);
      return;
    }

    notifyUser(NOTIFICATION_TYPE.login, NOTIFICATION_MSG.login.success);
    updateUsername(username); // add user in login-store
    navigate(PATH.home);
  };

  const form: UseFormReturnType<TLoginFormData> = useForm({
    mode: "uncontrolled",
    initialValues: INITIALLOGINFORM,
    validate: loginFormValidator,
  });

  return (
    <Flex gap={"lg"}>
      <Flex direction={"column"} gap={"4rem"} align={"center"} p={"xl"}>
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
          <Flex direction={"column"} gap={"lg"}>
            <TextInput
              size="md"
              w={"24rem"}
              placeholder="username"
              {...form.getInputProps("username")}
            />
            <PasswordInput
              size="md"
              placeholder="password"
              {...form.getInputProps("password")}
            />
          </Flex>
          <Button type="submit" size="md" w={"8rem"}>
            Submit
          </Button>
        </form>

        <Flex gap={"xs"}>
          <Text>Don't have an account?</Text>
          <Link to={PATH.signup}>Signup</Link>
        </Flex>
      </Flex>
      <Image src={backgroundImage} />
    </Flex>
  );
};

export default LoginPage;
