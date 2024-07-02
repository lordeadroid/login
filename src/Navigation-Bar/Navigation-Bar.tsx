import { Flex, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import UserSection from "../User-Section/User-Section";
import { PATH } from "../utils/constant";

const NavigationBar = () => {
  return (
    <Flex
      pos={"sticky"}
      top={0}
      bg={"aliceblue"}
      style={{ zIndex: 1 }}
      align={"center"}
      justify={"space-between"}
    >
      <Link to={PATH.home} style={{ all: "unset" }}>
        <Text size="5vh" fw={800}>
          AntStack
        </Text>
      </Link>
      <UserSection />
    </Flex>
  );
};

export default NavigationBar;
