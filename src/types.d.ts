export type TFormData = {
  username: string;
  email: string;
  password: string;
  number: string;
  nationality: string;
};

export type THandleSubmit = (values: TFormData) => void;

export type THomePage = (props: { logout: () => void }) => React.JSX.Element;

export type TValidateFormEntry = (value: string) => string | null;

export type TValidatorFn = (value: string) => boolean;

export type TFormStore = {
  formData: TFormData;
  updateForm: (newFormData: TFormData) => void;
};

export type TReact = () => React.JSX.Element;
