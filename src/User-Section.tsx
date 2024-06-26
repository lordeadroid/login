import { Button, Flex, Text } from "@mantine/core";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { useLoginStore } from "./use-store";
import { EMPTYSTRING, PATH } from "./constant";
import { TReact } from "./types";

const LogoutButton: TReact = () => {
  const resetUsername = useLoginStore((state) => state.resetUsername);
  const navigate: NavigateFunction = useNavigate();

  const handleLogout = (): void => {
    resetUsername();
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

  const handleLogin = (): void => {
    navigate(PATH.login);
  };

  return (
    <Button size="lg" onClick={handleLogin}>
      Login
    </Button>
  );
};

const Profile = ({ username }: { username: string }): React.JSX.Element => {
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
  const username = useLoginStore((state) => state.username);

  return username !== EMPTYSTRING ? (
    <Profile username={username} />
  ) : (
    <LoginButton />
  );
};

export default UserSection;
