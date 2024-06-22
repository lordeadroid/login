import "@mantine/core/styles.css";
import { useEffect, useState } from "react";
import { TFormData } from "./types";
import { EMPTYSTRING, INITIALFORMDATA, LOCALSTORAGE } from "./constant";
import { UseFormReturnType, useForm } from "@mantine/form";
import SignupPage from "./Signup/Signup-Page";
import HomePage from "./Homepage/Homepage";
import formValidator from "./form-validator";

const getFormData = (): TFormData => {
  const localData: string | null = localStorage.getItem(LOCALSTORAGE.propName);

  if (localData === null) {
    return INITIALFORMDATA;
  }

  return JSON.parse(localData);
};

const Page = (): React.JSX.Element => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [formData, setFormData] = useState<TFormData>(getFormData());

  const form: UseFormReturnType<TFormData> = useForm({
    mode: "uncontrolled",
    initialValues: INITIALFORMDATA,
    validate: formValidator,
  });

  const verifySignUp = (): boolean => {
    const { username, password } = getFormData();
    return username !== EMPTYSTRING && password !== EMPTYSTRING;
  };

  const updateFormData = (): void => {
    setFormData(getFormData());
  };

  const logout = (): void => {
    setFormData(INITIALFORMDATA);
    localStorage.setItem(
      LOCALSTORAGE.propName,
      JSON.stringify(INITIALFORMDATA)
    );
    form.reset();
  };

  const handleSubmit = (values: TFormData): void => {
    localStorage.setItem(LOCALSTORAGE.propName, JSON.stringify(values));
    updateFormData();
  };

  useEffect((): void => {
    setLoggedIn(verifySignUp());
  }, [formData]);

  return isLoggedIn ? (
    <HomePage logout={logout} />
  ) : (
    <SignupPage form={form} handleSubmit={handleSubmit} />
  );
};

export default Page;
