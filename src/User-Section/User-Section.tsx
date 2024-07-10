import cartIcon from "../assets/cart.png";
import { CreateAvatar } from "../Lib";
import { notifyUser } from "../utils/utils";
import { TReact, TSignupFormData } from "../types";
import { Button, Flex, Group, Image, Text } from "@mantine/core";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { useDatabaseStore, useLoginStore } from "../utils/use-store";
import {
  EMPTYSTRING,
  NOTIFICATION_MSG,
  NOTIFICATION_TYPE,
  PATH,
} from "../utils/constant";

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
      <Image src={cartIcon} h={30} alt="image of cart" />
      <Text c={"white"}>{cart.length}</Text>
    </Flex>
  );
};

const Profile = ({ username }: { username: string }) => {
  return (
    <Flex gap="md" align="center" justify={"center"}>
      <Group
        bd="1px solid darkgray"
        style={{ borderRadius: "1rem" }}
        p="0.5rem 1rem"
        bg={"white"}
      >
        <CreateAvatar />
        <Text size="xl" fs="italic">
          {username}
        </Text>
      </Group>
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
