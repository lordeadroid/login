import { Badge, Button, Card, Flex, Image, Text } from "@mantine/core";
import { TProduct, TSignupFormData } from "../types";
import { EMPTYSTRING, PATH, RATING } from "../utils/constant";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./homepage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDatabaseStore, useLoginStore } from "../utils/use-store";

const HomePage = () => {
  const url = "https://dummyjson.com/products";
  const username = useLoginStore((state) => state.username);
  const entries = useDatabaseStore((state) => state.entries);
  const addItemToCart = useDatabaseStore((state) => state.addItemToCart);
  const [productsData, setProductsData] = useState<TProduct[]>([]);
  const userData = entries.find((entry) => entry.username === username);
  const { cart } = (userData as TSignupFormData) || {};
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(url).then(({ data }) => {
      const { products } = data;
      setProductsData(products);
    });

    if (username === EMPTYSTRING) {
      navigate(PATH.login);
    }
  });

  const ratingColor = (rating: number): string => {
    if (rating >= 4) return RATING.good;
    if (rating >= 3) return RATING.okay;
    return RATING.poor;
  };

  return (
    <Flex wrap={"wrap"}>
      <Flex wrap={"wrap"} justify={"center"} gap="4vh">
        {productsData.map((product) => {
          const { id, title, price, rating, tags, thumbnail } = product;
          return (
            <Card radius="md" className={styles.card} key={id} w="20rem">
              <Flex justify="space-between" direction="column">
                <Image src={thumbnail} />
                <Flex align={"center"}>
                  <Text fz={"lg"} fw={600}>
                    {title}
                  </Text>
                </Flex>
                <Flex
                  pos={"relative"}
                  top={"-20rem"}
                  align={"center"}
                  justify={"space-between"}
                >
                  <Button size={"xs"} color={ratingColor(rating)}>
                    {rating}
                  </Button>
                  {cart.includes(id) ? (
                    <Button color="lime" size="xs">
                      Added
                    </Button>
                  ) : (
                    <Button
                      color="orange"
                      size="xs"
                      onClick={() => addItemToCart(username, id)}
                    >
                      Add
                    </Button>
                  )}
                </Flex>
                <Card.Section className={styles.section}>
                  {tags.map((tag, index) => {
                    return (
                      <Badge
                        size="sm"
                        variant="light"
                        key={index}
                        m={"0.25rem"}
                      >
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
