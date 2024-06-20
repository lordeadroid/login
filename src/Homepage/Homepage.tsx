import { Button, Flex, Text } from "@mantine/core";
import { THomePage } from "../types";

const HomePage: THomePage = ({ logout }) => {
  return (
    <Flex justify={"center"} align={"center"} h={"100vh"}>
      <Button
        onClick={logout}
        pos={"absolute"}
        top={"0.25rem"}
        right={"0.25rem"}
        size="lg"
        radius={"0.25rem"}
      >
        Logout
      </Button>
      <Text size="4rem" fw={500}>
        Signed Up Successfully
      </Text>
    </Flex>
  );
};

export default HomePage;
