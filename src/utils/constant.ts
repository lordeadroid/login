export const EMPTYSTRING = "";

export const INITIALLOGINFORM = {
  username: EMPTYSTRING,
  password: EMPTYSTRING,
};

export const MinInputLength = {
  username: 3,
  password: 3,
};

export const INITIALSIGNUPFORM = {
  username: EMPTYSTRING,
  email: EMPTYSTRING,
  password: EMPTYSTRING,
  number: EMPTYSTRING,
  nationality: EMPTYSTRING,
  cart: <number[]>[],
};

export const LOCALSTORAGE = {
  propName: "loginInfo",
};

export const FORMERROR = {
  email: "Invalid email",
  password: "Password must have at least 3 characters",
  username: "Username must have at least 3 characters",
  nationality: "Select one of the option",
};

export const NATIONALITY = {
  INDIAN: "indian",
  OTHER: "other",
};

export const PATH = {
  home: "/",
  cart: "/cart",
  login: "/login",
  signup: "/signup",
};

export const STORE = {
  database: "databaseStore",
  login: "loginStore",
};

export const NOTIFICATION_TYPE = {
  login: "Login",
  signup: "Signup",
  logout: "Logout",
};

export const NOTIFICATION_MSG = {
  login: {
    username: "User does not exists",
    password: "Wrong Password",
    success: "Logged In Succesfully",
  },
  signup: {
    username: "Username is already taken",
    success: "Account Created Succesfully",
  },
  logout: {
    success: "Logged Out Succesfully",
  },
  cart: {
    success: "Added to cart",
  },
};

export const RATING = {
  good: "green",
  okay: "yellow",
  poor: "red",
};

export const INITIALPRODUCTDATA = {
  title: EMPTYSTRING,
  price: 0,
  rating: 0,
  tags: [EMPTYSTRING, EMPTYSTRING],
  images: [EMPTYSTRING, EMPTYSTRING, EMPTYSTRING],
  thumbnail: EMPTYSTRING,
  description: EMPTYSTRING,
  availabilityStatus: EMPTYSTRING,
  stock: 0,
  dimensions: { height: 0, width: 0, depth: 0 },
  shippingInformation: EMPTYSTRING,
  warrantyInformation: EMPTYSTRING,
  returnPolicy: EMPTYSTRING,
  reviews: [
    {
      rating: 0,
      date: EMPTYSTRING,
      comment: EMPTYSTRING,
      reviewerName: EMPTYSTRING,
    },
  ],
};
