import { useEffect, useState } from "react";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import { TFormData } from "./types";
import { EMPTYSTRING, INITIALFORMDATA, LOCALSTORAGE } from "./constant";
import { UseFormReturnType, useForm } from "@mantine/form";
import SignupPage from "./Signup-Page";
import HomePage from "./Homepage";

const getFormData = (): TFormData => {
  const localData: string | null = localStorage.getItem(LOCALSTORAGE.propName);

  if (localData === null) {
    return INITIALFORMDATA;
  }

  return JSON.parse(localData);
};

const App = (): React.JSX.Element => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [formData, setFormData] = useState<TFormData>(getFormData());

  const form: UseFormReturnType<TFormData> = useForm({
    mode: "uncontrolled",
    initialValues: INITIALFORMDATA,
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

  return (
    <MantineProvider>
      {isLoggedIn ? (
        <HomePage logout={logout} />
      ) : (
        <SignupPage form={form} handleSubmit={handleSubmit} />
      )}
    </MantineProvider>
  );
};

export default App;
