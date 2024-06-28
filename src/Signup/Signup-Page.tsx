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
import styles from "../style.module.css";
import { EMPTYSTRING, ERROR, INITIALSIGNUPFORM, PATH } from "../utils/constant";
import { UseFormReturnType, useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import { signupFormValidator } from "../utils/form-validator";
import { useEffect } from "react";
import { useDatabaseStore, useLoginStore } from "../utils/use-store";
import { hashString, userExist } from "../utils/utils";

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
      alert(ERROR.signup);
      return;
    }

    values.password = await hashString(password);

    updateUsername(username); // add user in login-store
    addEntry(values); // add user in db-store
    navigate(PATH.home);
  };

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
          <Text>Already have an account?</Text>
          <Link to={PATH.login}>Login</Link>
        </Flex>
        <form onSubmit={form.onSubmit(handleSubmit)} className={styles.form}>
          <Flex direction={"column"} gap={"1rem"}>
            <TextInput
              w="25rem"
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
              size="lg"
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
