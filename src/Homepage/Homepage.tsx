import axios from "axios";
import styles from "./homepage.module.css";
import { TProduct } from "../types";
import { useEffect, useState } from "react";
import { ratingColor } from "../utils/utils";
import { useLoginStore } from "../utils/use-store";
import { Link, useNavigate } from "react-router-dom";
import { EMPTYSTRING, PATH } from "../utils/constant";
import { AddToCartButton, CreateButton } from "../Lib";
import {
  Badge,
  Button,
  Card,
  Flex,
  Image,
  Skeleton,
  Text,
} from "@mantine/core";

const HomePage = () => {
  const navigate = useNavigate();
  const url = "https://dummyjson.com/products";
  const username = useLoginStore((state) => state.username);
  const [productsData, setProductsData] = useState<TProduct[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (username === EMPTYSTRING) {
      navigate(PATH.login);
    }

    axios.get(url).then(({ data }) => {
      const { products } = data;
      setProductsData(products);
      setLoading(!isLoading);
    });
  }, [navigate, username, isLoading]);

  return (
    <Flex wrap={"wrap"}>
      <Flex wrap={"wrap"} justify={"center"} gap="4vh">
        {productsData.map((product) => {
          const { id, title, price, rating, tags, thumbnail } = product;
          return (
            <Skeleton w={"20rem"} visible={isLoading}>
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
                    <CreateButton
                      value={`${rating}`}
                      color={ratingColor(rating)}
                    />
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
                        More Details
                      </Button>
                    </Link>
                    <Button radius="md" style={{ flex: 1 }} color="teal">
                      ${price}
                    </Button>
                  </Flex>
                </Flex>
              </Card>
            </Skeleton>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default HomePage;
