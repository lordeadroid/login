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
    <Flex align={"center"} justify={"center"} direction={"column"} p={"10rem"}>
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
      <Flex gap={"0.5rem"} p={"1rem"}>
        <Text>Already have an account?</Text>
        <Link to={PATH.login}>Login</Link>
      </Flex>
    </Flex>
  );
};

export default SignupPage;
