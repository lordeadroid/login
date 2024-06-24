import { Button, Flex, Text } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import useFormStore from "./form-store";
import { LOCALSTORAGE, PATH } from "./constant";
import { TReact, TUser, TUserStatus } from "./types";

const getLoginStatus: TUserStatus = () => {
  const loginStatus: string | null = localStorage.getItem(
    LOCALSTORAGE.propName
  );

  if (loginStatus === null) {
    return { status: false };
  }

  return { status: true, ...JSON.parse(loginStatus) };
};

const LogoutButton: TReact = () => {
  const updateStatus = useFormStore((state) => state.updateStatus);
  const navigate = useNavigate();
  const logout = useFormStore((state) => state.resetForm);

  const handleLogout = (): void => {
    logout();
    updateStatus();
    navigate("/");
  };

  return (
    <Button size="md" onClick={handleLogout}>
      Logout
    </Button>
  );
};

const UserSection: TReact = () => {
  const userInfo: TUser = getLoginStatus();

  const loginButton: React.JSX.Element = (
    <Link to={PATH.login} style={{ color: "white", all: "unset" }}>
      <Button size="md">Login</Button>
    </Link>
  );

  const profile: React.JSX.Element = (
    <Flex gap={"1rem"} align={"center"}>
      <Text size="1.5rem" fs={"italic"}>
        Welcome, {userInfo.username}
      </Text>
      <LogoutButton />
    </Flex>
  );

  return userInfo.status ? profile : loginButton;
};

export default UserSection;
