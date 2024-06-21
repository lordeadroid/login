import { UseFormReturnType } from "@mantine/form";

export type TFormData = {
  username: string;
  email: string;
  password: string;
};

export type THandleSubmit = {
  values: TFormData;
};

export type TSignUpPage = (props: {
  form: UseFormReturnType<TFormData>;
  handleSubmit: (values: TFormData) => void;
}) => React.JSX.Element;

export type THomePage = (props: { logout: () => void }) => React.JSX.Element;

export type TValidateFormEntry = (value: string) => string | null;

export type TValidatorFn = (value: string) => boolean;
