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
  status: boolean;
  updateStatus: () => void;
  updateForm: (newFormData: TFormData) => void;
  resetForm: () => void;
};

export type TReact = () => React.JSX.Element;

export type TUser = {
  status: boolean;
  username?: string;
  email?: string;
};

export type TUserStatus = () => TUser;
