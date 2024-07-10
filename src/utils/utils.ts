import { notifications } from "@mantine/notifications";
import { TSignupFormData, TUserExist, TVerifiedUser } from "../types";
import { LOCALSTORAGE, RATING } from "./constant";

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

export const ratingColor = (rating: number): string => {
  if (rating >= 4) return RATING.good;
  if (rating >= 3) return RATING.okay;
  return RATING.poor;
};

export const notifyUser = (title: string, message: string) => {
  notifications.show({
    title,
    message,
    autoClose: 2000,
    position: "top-center",
  });
};
