import { LOCALSTORAGE } from "./constant";
import { TSignupFormData, TUserExist, TVerifiedUser } from "./types";

export const updateLoginInfo = (username: string) => {
  localStorage.setItem(
    LOCALSTORAGE.propName,
    JSON.stringify({ username, status: true })
  );
};

export const hashString = async (input: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hash = await crypto.subtle.digest("SHA-512", data);

  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

export const userExist: TUserExist = (db, username) => {
  return db.some((entry) => entry.username === username);
};

export const isVerifiedUser: TVerifiedUser = (db, username, password) => {
  const user = db.find(
    (entry) => entry.username === username
  ) as TSignupFormData;

  return user.password === password;
};
