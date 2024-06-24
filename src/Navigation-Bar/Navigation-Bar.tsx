import { Button, Flex, Text } from "@mantine/core";
import { TReact } from "../types";
import { Link } from "react-router-dom";

const getLoginStatus = (): boolean => {
  const loginStatus: string | null = localStorage.getItem("loginStatus");
  if (loginStatus === null) {
    return false;
  }

  return JSON.parse(loginStatus);
};

const Profile: TReact = () => {
  const isLoggedIn: boolean = getLoginStatus();

  const loginButton: React.JSX.Element = (
    <Link to="/login" style={{ color: "white", all: "unset" }}>
      <Button size="lg">Login</Button>
    </Link>
  );

  return isLoggedIn ? <Text>Rishabh</Text> : loginButton;
};

const NavigationBar = () => {
  return (
    <Flex h={"5rem"} p={"1rem"} justify={"space-between"} align={"center"}>
      <Link to={"/"} style={{ all: "unset" }}>
        <Text size="4rem" fw={900}>
          antstack
        </Text>
      </Link>
      <Text>
        <Profile />
      </Text>
    </Flex>
  );
};

export default NavigationBar;
