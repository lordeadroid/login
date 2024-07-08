import {
  Badge,
  Box,
  Flex,
  Group,
  Image,
  List,
  Text,
  Title,
} from "@mantine/core";
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
    tags,
    price,
    stock,
    title,
    images,
    rating,
    dimensions,
    description,
    returnPolicy,
    availabilityStatus,
    shippingInformation,
    warrantyInformation,
  } = productData;
  const { height, width, depth } = dimensions;
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
        <Flex direction={"column"} gap={"1rem"}>
          {images.map((imgUrl, index) => {
            const isSelectedImg = selectedImg === index;
            return (
              <Flex
                h={"15rem"}
                w={"10rem"}
                onClick={() => setSelectedImg(index)}
                key={index}
              >
                <Image
                  src={imgUrl}
                  radius={"sm"}
                  bg={isSelectedImg ? "white" : "whitesmoke"}
                  bd={isSelectedImg ? "1px solid black" : "1px solid darkgray"}
                />
              </Flex>
            );
          })}
        </Flex>
        <Flex
          pos={"relative"}
          justify={"center"}
          className={loadingStyle}
          bd={"1px solid gray"}
        >
          <Box pos={"absolute"} left={8} top={8}>
            <CreateButton
              value={`${rating}`}
              size="sm"
              color={ratingColor(rating)}
            />
          </Box>
          <Flex h={"47rem"} w={"40rem"}>
            <Image src={images[selectedImg]} />
          </Flex>
        </Flex>
      </Flex>
      <Flex
        gap={"lg"}
        direction={"column"}
        justify={"space-between"}
        p={"xl"}
        bd={"1px solid gray"}
        style={{ borderRadius: "0.5rem" }}
      >
        <Flex direction={"column"} gap={"lg"}>
          <Title className={loadingStyle}>{title}</Title>
          <Group>
            <Badge color="green" size="lg">
              {availabilityStatus}
            </Badge>
            <Badge variant="dot" color="green" size="lg">
              {stock}
            </Badge>
          </Group>
          <Group>
            <Flex className={styles.section} gap={"xs"}>
              {tags.map((tag, index) => {
                return (
                  <Badge size="xl" variant="light" key={index}>
                    {tag}
                  </Badge>
                );
              })}
            </Flex>
          </Group>
          <Text size="xl">{description}</Text>
          <Group>
            <CreateButton value={`$ ${price}`} size="md" color="teal" />
            <AddToCartButton id={Number(id)} size="md" />
          </Group>
        </Flex>
        <Flex
          direction={"column"}
          p={"xl"}
          bd={"1px solid darkgray"}
          bg={"rgb(255, 244, 244)"}
          style={{ borderRadius: "0.5rem" }}
        >
          <Text fw={700}>Additional Product Details</Text>
          <Flex direction={"column"} p={"xs"}>
            <List spacing={"xs"}>
              <List.Item>Product Dimensions</List.Item>
              <Flex direction={"column"} p={"0 25"}>
                <Text>Height: {height}</Text>
                <Text>Width: {width}</Text>
                <Text>Depth: {depth}</Text>
              </Flex>
              <List.Item>{warrantyInformation}</List.Item>
              <List.Item>{shippingInformation}</List.Item>
              <List.Item>{returnPolicy}</List.Item>
            </List>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductPage;
