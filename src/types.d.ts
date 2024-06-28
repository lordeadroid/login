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

export type TUserExist = (db: TSignupFormData[], username: string) => boolean;

export type TVerifiedUser = (
  db: TSignupFormData[],
  username: string,
  password: string
) => boolean;

export type TProduct = {
  id: number;
  title: string;
  price: number;
  rating: number;
  tags: string[];
  thumbnail: string;
};

export type TProductPage = Omit<TProduct, "id"> & {
  id?: number;
  images: string[];
};
