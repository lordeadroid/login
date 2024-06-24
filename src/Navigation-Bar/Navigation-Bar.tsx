import { Flex, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import useFormStore from "../form-store";
import { useEffect } from "react";
import UserSection from "../User-Section";
import { PATH } from "../constant";

const NavigationBar = () => {
  const status = useFormStore((state) => state.status);

  useEffect(() => {}, [status]);

  return (
    <Flex h={"5rem"} p={"1rem"} justify={"space-between"} align={"center"}>
      <Link to={PATH.home} style={{ all: "unset" }}>
        <Text size="4rem" fw={900}>
          antstack
        </Text>
      </Link>
      <Text>
        <UserSection />
      </Text>
    </Flex>
  );
};

export default NavigationBar;
