import { FORMERROR } from "./constant";
import { TValidateFormEntry, TValidatorFn } from "./types";

const isValidEmail: TValidatorFn = (value) => /^\S+@\S+$/.test(value);

const validateEmail: TValidateFormEntry = (value) => {
  return isValidEmail(value) ? null : FORMERROR.email;
};

const isValidPassword: TValidatorFn = (value) => value.length < 3;

const validatePassword: TValidateFormEntry = (value) => {
  return isValidPassword(value) ? FORMERROR.password : null;
};

const isValidUsername: TValidatorFn = (value) => value.length < 3;

const validateUsername: TValidateFormEntry = (value) => {
  return isValidUsername(value) ? FORMERROR.username : null;
};

const formValidator = {
  email: validateEmail,
  password: validatePassword,
  username: validateUsername,
};

export default formValidator;
