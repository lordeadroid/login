import { LOCALSTORAGE } from "./constant";
import { TFindByUsername } from "./types";

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

export const findByUsername: TFindByUsername = (db, username) => {
  return db.some((entry) => entry.username === username);
};
