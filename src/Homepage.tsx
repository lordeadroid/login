import { Box, Flex, Text } from "@mantine/core";
import { THomePage } from "./types";

const HomePage: THomePage = ({ logout }) => {
  return (
    <Flex justify={"center"} align={"center"} h={"100vh"}>
      <Box onClick={logout} pos={"absolute"} top={0} right={0}>
        Logout
      </Box>
      <Text size="xl" fz={"h1"}>
        Signed Up Successfully
      </Text>
    </Flex>
  );
};

export default HomePage;
