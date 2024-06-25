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

export type THandleSubmit = (values: TFormData) => void;

export type THomePage = (props: { logout: () => void }) => React.JSX.Element;

export type TValidateFormEntry = (value: string) => string | null;

export type TValidatorFn = (value: string) => boolean;

export type TFormStore = {
  formData: TSignupFormData;
  status: boolean;
  updateStatus: () => void;
  updateForm: (values: TSignupFormData) => void;
  resetForm: () => void;
};

export type TReact = () => React.JSX.Element;

export type TUser = {
  status: boolean;
  username?: string;
  email?: string;
};

export type TUserStatus = () => TUser;
