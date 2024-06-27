import { FORMERROR, NATIONALITY } from "./constant";
import { TValidateFormEntry, TValidatorFn } from "../types";

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

const isValidNationality: TValidatorFn = (value) =>
  value === NATIONALITY.INDIAN || value === NATIONALITY.OTHER;

const validateNationality: TValidateFormEntry = (value) => {
  return isValidNationality(value) ? null : FORMERROR.nationality;
};

const signupFormValidator = {
  email: validateEmail,
  password: validatePassword,
  username: validateUsername,
  nationality: validateNationality,
};

const loginFormValidator = {
  username: validateUsername,
  password: validatePassword,
};

export { signupFormValidator, loginFormValidator };
