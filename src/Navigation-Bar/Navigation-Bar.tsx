import UserSection from "../User-Section/User-Section";
import { Link } from "react-router-dom";
import { PATH } from "../utils/constant";
import { Flex, Text } from "@mantine/core";

const Logo = () => {
  return (
    <Link to={PATH.home} style={{ all: "unset" }}>
      <Text fw={700} fz={"h1"}>
        AntStack
      </Text>
    </Link>
  );
};

const NavigationBar = () => {
  return (
    <Flex
      h={"8vh"}
      pos={"sticky"}
      top={0}
      bg={"aliceblue"}
      style={{ zIndex: 1, cursor: "pointer" }}
      align={"center"}
      justify={"space-between"}
    >
      <Logo />
      <UserSection />
    </Flex>
  );
};

export default NavigationBar;
