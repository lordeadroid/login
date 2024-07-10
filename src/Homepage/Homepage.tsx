import axios from "axios";
import styles from "./homepage.module.css";
import { TProduct } from "../types";
import { useEffect, useState } from "react";
import { ratingColor } from "../utils/utils";
import { useLoginStore } from "../utils/use-store";
import { Link, useNavigate } from "react-router-dom";
import { AddToCartButton, CreateButton } from "../Lib";
import { EMPTYSTRING, PATH, SIZE } from "../utils/constant";
import { Badge, Card, Flex, Image, Skeleton, Text } from "@mantine/core";

const CreateCard = ({ productData }: { productData: TProduct }) => {
  const { id, title, price, rating, tags, thumbnail } = productData;

  return (
    <Card withBorder className={styles.card} radius={SIZE.medium} w="20rem">
      <Flex justify="space-between" direction="column" pos="relative" h="30rem">
        <Image src={thumbnail} alt={`Image of ${title}`} />
        <Text fz={SIZE.large} fw={600}>
          {title}
        </Text>
        <Flex w={"100%"} pos={"absolute"} justify={"space-between"}>
          <CreateButton value={`${rating}`} color={ratingColor(rating)} />
          <AddToCartButton productName={title} id={id} />
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
        <Flex gap={SIZE.extraSmall}>
          <Link to={`products/${id}`}>
            <CreateButton value="More Details" w="11rem" size={SIZE.small} />
          </Link>
          <CreateButton
            value={`$${price}`}
            color="teal"
            w="6rem"
            size={SIZE.small}
          />
        </Flex>
      </Flex>
    </Card>
  );
};

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
      setLoading(false);
    });
  }, [navigate, username, isLoading]);

  return (
    <Flex wrap={"wrap"} justify={"center"} gap={"2rem"}>
      {productsData.map((productData) => {
        return (
          <Skeleton w={"20rem"} visible={isLoading} key={productData.id}>
            <CreateCard productData={productData} />
          </Skeleton>
        );
      })}
    </Flex>
  );
};

export default HomePage;
