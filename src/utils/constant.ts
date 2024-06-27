export const EMPTYSTRING = "";

export const INITIALLOGINFORM = {
  username: EMPTYSTRING,
  password: EMPTYSTRING,
};

export const INITIALSIGNUPFORM = {
  username: EMPTYSTRING,
  email: EMPTYSTRING,
  password: EMPTYSTRING,
  number: EMPTYSTRING,
  nationality: EMPTYSTRING,
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
  login: "/login",
  signup: "/signup",
};

export const STORE = {
  database: "databaseStore",
  login: "loginStore",
};

export const ERROR = {
  signup: "Username is already taken",
  login: {
    username: "User does not exists",
    password: "Wrong Password",
  },
};
