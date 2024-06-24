import { Button, Flex, Text } from "@mantine/core";
import { useNavigate, NavigateFunction } from "react-router-dom";
import useFormStore from "./form-store";
import { PATH } from "./constant";
import { TReact, TUser } from "./types";
import { getLoginStatus } from "./utils";
import React from "react";

const LogoutButton: TReact = () => {
  const logout = useFormStore((state) => state.resetForm);
  const updateStatus = useFormStore((state) => state.updateStatus);
  const navigate: NavigateFunction = useNavigate();

  const handleLogout = (): void => {
    logout();
    updateStatus();
    navigate(PATH.home);
  };

  return (
    <Button size="lg" onClick={handleLogout}>
      Logout
    </Button>
  );
};

const LoginButton: TReact = () => {
  const navigate: NavigateFunction = useNavigate();
  const updateStatus = useFormStore((state) => state.updateStatus);

  const handleLogin = (): void => {
    updateStatus();
    navigate(PATH.login);
  };

  return (
    <Button size="lg" onClick={handleLogin}>
      Login
    </Button>
  );
};

const Profile = ({
  username,
}: {
  username: string | undefined;
}): React.JSX.Element => {
  return (
    <Flex gap={"1rem"} align={"center"}>
      <Text size="1.5rem" fs={"italic"}>
        Welcome, {username}
      </Text>
      <LogoutButton />
    </Flex>
  );
};

const UserSection: TReact = () => {
  const userInfo: TUser = getLoginStatus();

  return userInfo.status ? (
    <Profile username={userInfo.username} />
  ) : (
    <LoginButton />
  );
};

export default UserSection;
