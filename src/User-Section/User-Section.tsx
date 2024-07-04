import { Button, Flex, Image, Text } from "@mantine/core";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { EMPTYSTRING, PATH } from "../utils/constant";
import { TReact, TSignupFormData } from "../types";
import { useDatabaseStore, useLoginStore } from "../utils/use-store";

const LogoutButton: TReact = () => {
  const resetUsername = useLoginStore((state) => state.resetUsername);
  const navigate: NavigateFunction = useNavigate();

  const handleLogout = (): void => {
    resetUsername();
    navigate(PATH.login);
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

const CartDetails = ({ username }: { username: string }) => {
  const entries = useDatabaseStore((state) => state.entries);
  const { cart } = entries.find(
    (entry) => entry.username === username
  ) as TSignupFormData;

  return (
    <Flex
      align={"center"}
      gap={"xs"}
      bg={"blue"}
      p={"1.5 12"}
      style={{ borderRadius: "0.5rem" }}
    >
      <Image src="/src/assets/cart.png" h={25} />
      <Text size="xl" c={"white"}>
        {cart.length}
      </Text>
    </Flex>
  );
};

const Profile = ({ username }: { username: string }) => {
  return (
    <Flex gap="md" align="center">
      <Text size="xl" fs="italic">
        {username}
      </Text>
      <CartDetails username={username} />
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
