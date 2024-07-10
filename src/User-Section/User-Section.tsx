import cartIcon from "../assets/cart.png";
import { TSignupFormData } from "../types";
import { notifyUser } from "../utils/utils";
import { CreateAvatar, CreateButton } from "../Lib";
import { Flex, Group, Image, Text } from "@mantine/core";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { useDatabaseStore, useLoginStore } from "../utils/use-store";
import {
  EMPTYSTRING,
  NOTIFICATION_MSG,
  NOTIFICATION_TYPE,
  PATH,
} from "../utils/constant";

const LogoutButton = () => {
  const navigate: NavigateFunction = useNavigate();
  const resetUsername = useLoginStore((state) => state.resetUsername);

  const handleLogout = (): void => {
    notifyUser(NOTIFICATION_TYPE.logout, NOTIFICATION_MSG.logout.success);
    resetUsername();
    navigate(PATH.login);
  };

  return <CreateButton value="Logout" size="lg" handleClick={handleLogout} />;
};

const LoginButton = () => {
  const navigate: NavigateFunction = useNavigate();

  const handleLogin = (): void => {
    navigate(PATH.login);
  };

  return <CreateButton value="Login" size="lg" handleClick={handleLogin} />;
};

const ProfileButton = () => {
  const username = useLoginStore((state) => state.username);

  return (
    <Group
      bd="1px solid darkgray"
      style={{ borderRadius: "2rem" }}
      p="0.5rem 0.75rem"
      bg="white"
    >
      <CreateAvatar />
      <Text size="xl" fs="italic">
        {username}
      </Text>
    </Group>
  );
};

const CartDetails = () => {
  const username = useLoginStore((state) => state.username);
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

const Profile = () => {
  return (
    <Flex gap="md" align="center" justify={"center"}>
      <ProfileButton />
      <CartDetails />
      <LogoutButton />
    </Flex>
  );
};

const UserSection = () => {
  const username = useLoginStore((state) => state.username);

  return username !== EMPTYSTRING ? <Profile /> : <LoginButton />;
};

export default UserSection;
