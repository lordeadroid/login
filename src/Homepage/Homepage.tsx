import { Flex, Image, Text } from "@mantine/core";
import { TReact } from "../types";
import { useLoginStore } from "../use-store";
import { EMPTYSTRING } from "../constant";
import { useEffect, useState } from "react";
import axios from "axios";

type TProduct = {
  title: string;
  images: string[];
};

const HomePage: TReact = () => {
  const username = useLoginStore((state) => state.username);
  const [element, setElement] = useState(<></>);

  useEffect(() => {
    axios.get("https://dummyjson.com/products").then(({ data }) => {
      const { products } = data;
      const elements = products.map((element: TProduct, index: number) => {
        return (
          <Flex
            justify={"center"}
            align={"center"}
            direction={"column"}
            h={"12rem"}
            w={"12rem"}
            key={index}
          >
            <Image h="10rem" w={"10rem"} src={element.images[0]} />
            <Text>{element.title}</Text>
          </Flex>
        );
      });

      setElement(<Flex wrap={"wrap"}>{elements}</Flex>);
    });
  }, []);

  return username === EMPTYSTRING ? <Text>Homepage</Text> : element;
};

export default HomePage;
