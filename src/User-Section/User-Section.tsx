import { Button, Flex, Image, Text } from "@mantine/core";
import { useNavigate, NavigateFunction } from "react-router-dom";
import {
  EMPTYSTRING,
  NOTIFICATION_MSG,
  NOTIFICATION_TYPE,
  PATH,
} from "../utils/constant";
import { TReact, TSignupFormData } from "../types";
import { useDatabaseStore, useLoginStore } from "../utils/use-store";
import cartIcon from "../assets/cart.png";
import { notifyUser } from "../utils/utils";

const LogoutButton: TReact = () => {
  const resetUsername = useLoginStore((state) => state.resetUsername);
  const navigate: NavigateFunction = useNavigate();

  const handleLogout = (): void => {
    notifyUser(NOTIFICATION_TYPE.logout, NOTIFICATION_MSG.logout.success);
    resetUsername();
    navigate(PATH.login);
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

const CartDetails = ({ username }: { username: string }) => {
  const entries = useDatabaseStore((state) => state.entries);
  const { cart } = entries.find(
    (entry) => entry.username === username
  ) as TSignupFormData;

  return (
    <Flex
      align={"center"}
      gap={"xs"}
      bg={"indigo"}
      p={"xs"}
      style={{ borderRadius: "0.5rem" }}
    >
      <Image src={cartIcon} h={30} />
      <Text c={"white"}>{cart.length}</Text>
    </Flex>
  );
};

const Profile = ({ username }: { username: string }) => {
  return (
    <Flex gap="md" align="center" justify={"center"}>
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
