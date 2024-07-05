import { Badge, Flex, Group, Image, Text, Title } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TProductPage } from "../types";
import styles from "../style.module.css";
import { EMPTYSTRING, INITIALPRODUCTDATA } from "../utils/constant";
import { AddToCartButton, CreateButton } from "../Lib";
import { ratingColor } from "../utils/utils";

const ProductPage = () => {
  const { id } = useParams();
  const url = `https://dummyjson.com/products/${id}`;
  const [selectedImg, setSelectedImg] = useState<number>(0);
  const [isFetching, setFetching] = useState<boolean>(true);
  const [productData, setProductData] =
    useState<TProductPage>(INITIALPRODUCTDATA);

  const {
    title,
    images,
    rating,
    description,
    tags,
    price,
    availabilityStatus,
    stock,
  } = productData;

  const loadingStyle = isFetching ? styles.skeletonLoading : EMPTYSTRING;

  useEffect(() => {
    axios.get(url).then(({ data }) => {
      setProductData(data);
      setFetching(false);
    });
  }, [url]);

  return (
    <Flex gap={"xl"}>
      <Flex gap={"md"}>
        <Flex direction={"column"} gap={"md"}>
          {images.map((imgUrl, index) => {
            const isSelectedImg = selectedImg === index;
            return (
              <Image
                src={imgUrl}
                key={index}
                w={"13vw"}
                radius={"sm"}
                onClick={() => setSelectedImg(index)}
                bd={isSelectedImg ? "1px solid black" : "1px solid darkgray"}
                bg={isSelectedImg ? "white" : "none"}
              />
            );
          })}
        </Flex>
        <Flex
          pos={"relative"}
          justify={"center"}
          className={loadingStyle}
          bd={"1px solid gray"}
        >
          <Flex pos={"absolute"} left={8} top={8}>
            <CreateButton
              value={`${rating}`}
              size="sm"
              color={ratingColor(rating)}
            />
          </Flex>
          <Image
            src={images[selectedImg]}
            w={"36vw"}
            fit="contain"
            bg={"linear-gradient(white, rgb(222, 226, 230) 100%)"}
          />
        </Flex>
      </Flex>
      <Flex gap={"lg"} direction={"column"}>
        <Title className={loadingStyle}>{title}</Title>
        <Group gap={"xs"}>
          <Badge color="green" size="lg">
            {availabilityStatus}
          </Badge>
          <Badge variant="dot" color="green" size="lg">
            {stock}
          </Badge>
        </Group>
        <Flex justify={"space-between"} align={"center"}>
          <Flex className={styles.section} gap={"xs"}>
            {tags.map((tag, index) => {
              return (
                <Badge size="xl" variant="light" key={index}>
                  {tag}
                </Badge>
              );
            })}
          </Flex>
        </Flex>
        <Text size="xl">{description}</Text>
        <Flex gap={"md"}>
          <CreateButton value={`$ ${price}`} size="md" color="teal" />
          <AddToCartButton id={Number(id)} size="md" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductPage;
