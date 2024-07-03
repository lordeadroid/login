import { Badge, Button, Card, Flex, Image, Text } from "@mantine/core";
import { TProduct, TSignupFormData } from "../types";
import { EMPTYSTRING, PATH, RATING } from "../utils/constant";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./homepage.module.css";
import { Link } from "react-router-dom";
import { useDatabaseStore, useLoginStore } from "../utils/use-store";

const HomePage = () => {
  const url = "https://dummyjson.com/products";
  const username = useLoginStore((state) => state.username);
  const entries = useDatabaseStore((state) => state.entries);
  const addItemToCart = useDatabaseStore((state) => state.addItemToCart);
  const [productsData, setProductsData] = useState<TProduct[]>([]);
  const userData = entries.find((entry) => entry.username === username);
  const { cart } = (userData as TSignupFormData) || {};

  const [cartItems, setCartItems] = useState(cart);

  useEffect(() => {
    axios.get(url).then(({ data }) => {
      const { products } = data;
      setProductsData(products);
    });
  }, [cartItems]);

  const ratingColor = (rating: number): string => {
    if (rating >= 4) return RATING.good;
    if (rating >= 3) return RATING.okay;
    return RATING.poor;
  };

  const loggedIn: boolean = username !== EMPTYSTRING;

  return (
    <Flex wrap={"wrap"}>
      {loggedIn ? (
        <Flex wrap={"wrap"} justify={"center"} gap="4vh">
          {productsData.map((product) => {
            const { id, title, price, rating, tags, thumbnail } = product;

            return (
              <Card radius={"md"} className={styles.card} key={id} w="20rem">
                <Flex
                  justify={"space-between"}
                  direction={"column"}
                  h={"25rem"}
                >
                  <Image src={thumbnail} height={180} />

                  <Flex align={"center"}>
                    <Text fz={"lg"} fw={600}>
                      {title}
                    </Text>
                  </Flex>

                  <Flex
                    pos={"relative"}
                    top={"-16rem"}
                    align={"center"}
                    justify={"space-between"}
                  >
                    <Button size={"xs"} color={ratingColor(rating)}>
                      {rating}
                    </Button>

                    {cart.includes(id) ? (
                      <Badge
                        size="lg"
                        variant="gradient"
                        gradient={{ from: "cyan", to: "blue", deg: 45 }}
                      >
                        <Link to={PATH.cart} style={{ all: "unset" }}>
                          <Text>Cart</Text>
                        </Link>
                      </Badge>
                    ) : (
                      <Badge
                        size="lg"
                        variant="gradient"
                        gradient={{ from: "cyan", to: "blue", deg: 45 }}
                        onClick={() => {
                          addItemToCart(username, id);
                          setCartItems([...cart, id]);
                        }}
                      >
                        <Text>Add</Text>
                      </Badge>
                    )}
                  </Flex>

                  <Card.Section className={styles.section}>
                    {tags.map((tag, index) => {
                      return (
                        <Badge size="sm" variant="light" key={index}>
                          {tag}
                        </Badge>
                      );
                    })}
                  </Card.Section>

                  <Flex gap={"0.5rem"}>
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
      ) : (
        <Text>Homepage</Text>
      )}
    </Flex>
  );
};

export default HomePage;
