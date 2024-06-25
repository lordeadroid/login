import { LOCALSTORAGE } from "./constant";
import { TUserStatus } from "./types";

export const getLoginStatus: TUserStatus = () => {
  const loginStatus: string | null = localStorage.getItem(
    LOCALSTORAGE.propName
  );

  if (loginStatus === null) {
    return { status: false };
  }

  return { status: true, ...JSON.parse(loginStatus) };
};

export const updateLoginInfo = (username: string) => {
  localStorage.setItem(
    LOCALSTORAGE.propName,
    JSON.stringify({ username, status: true })
  );
};

export const hashString = async (input: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hash = await crypto.subtle.digest("SHA-512", data);

  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};
