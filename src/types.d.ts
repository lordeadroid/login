export type TSignupFormData = {
  username: string;
  email: string;
  password: string;
  number: string;
  nationality: string;
};

export type TLoginFormData = {
  username: string;
  password: string;
};

export type THandleSubmit = (values: TSignupFormData) => void;

export type THomePage = (props: { logout: () => void }) => React.JSX.Element;

export type TValidateFormEntry = (value: string) => string | null;

export type TValidatorFn = (value: string) => boolean;

export type TReact = () => React.JSX.Element;

export type TDatabaseStore = {
  entries: TSignupFormData[];
  addEntry: (newEntry: TSignupFormData) => void;
};

export type TLoginStore = {
  username: string;
  updateUsername: (username: string) => void;
  resetUsername: () => void;
};

export type TFindByUsername = (
  db: TSignupFormData[],
  username: string
) => boolean;
