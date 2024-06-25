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
import styles from "./Signup.module.css";
import { INITIALSIGNUPFORM, PATH } from "../constant";
import { UseFormReturnType, useForm } from "@mantine/form";
import useFormStore from "../form-store";
import { Link, useNavigate } from "react-router-dom";
import { signupFormValidator } from "../form-validator";
import { updateLoginInfo } from "../utils";

const SignupPage: TReact = () => {
  const navigate = useNavigate();
  const refreshPage = useFormStore((state) => state.updateStatus);
  const updateFormData = useFormStore((state) => state.updateForm);

  const form: UseFormReturnType<TSignupFormData> = useForm({
    mode: "uncontrolled",
    initialValues: INITIALSIGNUPFORM,
    validate: signupFormValidator,
  });

  const handleSubmit: THandleSubmit = (values) => {
    const { username } = values;

    updateLoginInfo(username); // updating in localStorage
    updateFormData(values); // updating in formStore
    refreshPage(); // updating state for rerendering
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
