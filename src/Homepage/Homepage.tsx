import { Badge, Button, Card, Flex, Image, Text } from "@mantine/core";
import { TProduct } from "../types";
import { EMPTYSTRING, PATH } from "../utils/constant";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./homepage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useLoginStore } from "../utils/use-store";
import { AddToCartButton, RatingButton } from "../Lib";

const HomePage = () => {
  const navigate = useNavigate();
  const url = "https://dummyjson.com/products";
  const username = useLoginStore((state) => state.username);
  const [productsData, setProductsData] = useState<TProduct[]>([]);

  useEffect(() => {
    if (username === EMPTYSTRING) {
      navigate(PATH.login);
    }

    axios.get(url).then(({ data }) => {
      const { products } = data;
      setProductsData(products);
    });
  }, [navigate, username]); // ?

  return (
    <Flex wrap={"wrap"}>
      <Flex wrap={"wrap"} justify={"center"} gap="4vh">
        {productsData.map((product) => {
          const { id, title, price, rating, tags, thumbnail } = product;
          return (
            <Card
              radius="md"
              className={styles.card}
              key={id}
              w="20rem"
              withBorder
            >
              <Flex
                justify="space-between"
                direction="column"
                pos="relative"
                h="30rem"
              >
                <Image src={thumbnail} />
                <Text fz={"lg"} fw={600}>
                  {title}
                </Text>
                <Flex w={"100%"} pos={"absolute"} justify={"space-between"}>
                  <RatingButton rating={rating} />
                  <AddToCartButton id={id} />
                </Flex>
                <Card.Section className={styles.section}>
                  {tags.map((tag, index) => {
                    return (
                      <Badge variant="light" key={index} m={"0.25rem"}>
                        {tag}
                      </Badge>
                    );
                  })}
                </Card.Section>
                <Flex gap={"xs"}>
                  <Link to={`products/${id}`}>
                    <Button radius="md" style={{ flex: 1 }} w={"11rem"}>
                      Show details
                    </Button>
                  </Link>
                  <Button radius="md" style={{ flex: 1 }} color="teal">
                    ${price}
                  </Button>
                </Flex>
              </Flex>
            </Card>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default HomePage;
