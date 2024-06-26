import { Flex, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import UserSection from "../User-Section";
import { PATH } from "../constant";

const NavigationBar = () => {
  return (
    <Flex h={"5rem"} p={"1rem"} justify={"space-between"} align={"center"}>
      <Link to={PATH.home} style={{ all: "unset" }}>
        <Text size="4rem" fw={900}>
          antstack
        </Text>
      </Link>
      <UserSection />
    </Flex>
  );
};

export default NavigationBar;
