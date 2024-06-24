import {
  Button,
  Flex,
  Group,
  PasswordInput,
  Radio,
  RadioGroup,
  TextInput,
} from "@mantine/core";
import { TFormData, THandleSubmit, TReact } from "../types";
import styles from "./Signup.module.css";
import { INITIALFORMDATA, LOCALSTORAGE } from "../constant";
import { UseFormReturnType, useForm } from "@mantine/form";
import formValidator from "../form-validator";
import useFormStore from "../form-store";

// const getFormData = (): TFormData => {
//   const localData: string | null = localStorage.getItem(LOCALSTORAGE.propName);

//   if (localData === null) {
//     return INITIALFORMDATA;
//   }

//   return JSON.parse(localData);
// };

const SignupPage: TReact = () => {
  const updateFormData = useFormStore((state) => state.updateForm);

  const form: UseFormReturnType<TFormData> = useForm({
    mode: "uncontrolled",
    initialValues: INITIALFORMDATA,
    validate: formValidator,
  });

  const handleSubmit: THandleSubmit = (values) => {
    localStorage.setItem(LOCALSTORAGE.propName, JSON.stringify(values));
    updateFormData(values);
  };

  return (
    <Flex align={"center"} justify={"center"} direction={"column"} p={"15rem"}>
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
    </Flex>
  );
};

export default SignupPage;
