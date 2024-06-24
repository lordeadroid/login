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
