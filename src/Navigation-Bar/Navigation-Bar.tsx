import { Flex, Text } from "@mantine/core";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <Flex justify={"space-between"} align={"center"}>
      <Text size="4rem" fw={900}>
        antstack
      </Text>
      <Text>
        <Link to={"/signup"}>signup</Link>
      </Text>
    </Flex>
  );
};

export default NavigationBar;
