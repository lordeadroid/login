import { Badge, Button, Card, Flex, Image, Text } from "@mantine/core";
import { TProduct } from "../types";
import { EMPTYSTRING } from "../utils/constant";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./homepage.module.css";
import { Link } from "react-router-dom";
import { useLoginStore } from "../utils/use-store";

const HomePage = () => {
  const url = "https://dummyjson.com/products";
  const username = useLoginStore((state) => state.username);
  const [productsData, setProductsData] = useState<TProduct[]>([]);

  useEffect(() => {
    axios.get(url).then(({ data }) => {
      const { products } = data;
      setProductsData(products);
    });
  }, []);

  return username === EMPTYSTRING ? (
    <Text>Homepage</Text>
  ) : (
    <Flex wrap={"wrap"} justify={"center"} gap={"5rem 2rem"} p={"5rem 0rem"}>
      {productsData.map((product) => {
        const { id, title, price, rating, tags, thumbnail } = product;

        return (
          <Card
            radius={"md"}
            p={"md"}
            className={styles.card}
            key={id}
            w={"20rem"}
          >
            <Flex justify={"space-between"} direction={"column"} h={"25rem"}>
              <Image src={thumbnail} height={180} />
              <Flex align={"center"}>
                <Text fz={"lg"} fw={600}>
                  {title}
                </Text>
              </Flex>
              <Button
                w={"3.5rem"}
                size={"xs"}
                pos={"-webkit-sticky"}
                top={"-16rem"}
                left={"-1rem"}
                variant={"light"}
              >
                {rating}
              </Button>
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
  );
};

export default HomePage;
