import { Button, Flex, Text } from "@mantine/core";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { EMPTYSTRING, PATH } from "../utils/constant";
import { TReact } from "../types";
import { useLoginStore } from "../utils/use-store";

const LogoutButton: TReact = () => {
  const resetUsername = useLoginStore((state) => state.resetUsername);
  const navigate: NavigateFunction = useNavigate();

  const handleLogout = (): void => {
    resetUsername();
    navigate(PATH.home);
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

const LoginButton: TReact = () => {
  const navigate: NavigateFunction = useNavigate();

  const handleLogin = (): void => {
    navigate(PATH.login);
  };

  return <Button onClick={handleLogin}>Login</Button>;
};

const Profile = ({ username }: { username: string }): React.JSX.Element => {
  return (
    <Flex gap="md" align="center">
      <Text size="xl" fs="italic">
        {username}
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
