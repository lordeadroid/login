export type TSignupFormData = {
  username: string;
  email: string;
  password: string;
  number: string;
  nationality: string;
  cart: number[];
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
  addItemToCart: (username: string, id: numebr) => void;
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
  description: string;
  stock: number;
  availabilityStatus: string;
};

export type TAddToCartButton = {
  id: number;
  size?: string;
};

export type TButton = {
  value?: string;
  size?: string;
  color?: string;
  handleClick?: () => void;
};
