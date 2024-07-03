import { useEffect } from "react";
import { useLoginStore } from "../utils/use-store";
import { EMPTYSTRING, PATH } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { Flex } from "@mantine/core";

const CartPage = () => {
  const navigate = useNavigate();
  const username = useLoginStore((state) => state.username);

  useEffect(() => {
    if (username === EMPTYSTRING) {
      navigate(PATH.home);
    }
  });

  return <Flex>Cart</Flex>;
};

export default CartPage;
