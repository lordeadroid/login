import { Badge, Flex, Image, Text, Title } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TProductPage } from "../types";
import styles from "../style.module.css";
import { EMPTYSTRING, INITIALPRODUCTDATA } from "../utils/constant";
import { AddToCartButton, RatingButton } from "../Lib";

const ProductPage = () => {
  const { id } = useParams();
  const url = `https://dummyjson.com/products/${id}`;
  const [isFetching, setFetching] = useState<boolean>(true);
  const [productData, setProductData] =
    useState<TProductPage>(INITIALPRODUCTDATA);

  const { title, images, rating, description, tags } = productData;
  const [mainImage, ...restImages] = images;
  const loadingStyle = isFetching ? styles.skeletonLoading : EMPTYSTRING;

  useEffect(() => {
    axios.get(url).then(({ data }) => {
      setProductData(data);
      setFetching(false);
    });
  }, [url]); // ?

  return (
    <Flex gap={"xl"}>
      <Flex gap={"md"} pos={"relative"}>
        <Flex pos={"absolute"} left={10} top={10}>
          <RatingButton rating={rating} />
        </Flex>
        <Flex
          h={"80vh"}
          w={"30vw"}
          bd={"1px solid gray"}
          justify={"center"}
          className={loadingStyle}
          style={{ borderRadius: "0.5rem" }}
        >
          <Image
            src={mainImage}
            radius={"md"}
            bg={"linear-gradient(white, rgb(222, 226, 230) 100%)"}
          />
        </Flex>
        <Flex direction={"column"} gap={"md"}>
          {restImages.map((imageURL, index) => (
            <Flex
              h={"39.25vh"}
              w={"15vw"}
              className={loadingStyle}
              key={index}
              style={{ borderRadius: "0.5rem" }}
            >
              <Image
                src={imageURL}
                bg={`linear-gradient(${180 * index}deg, white, whitesmoke 50%)`}
                loading="lazy"
              />
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Flex gap={"xl"} direction={"column"}>
        <Title className={loadingStyle}>{title}</Title>
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
          <AddToCartButton id={Number(id)} size={"md"} />
        </Flex>
        <Text size="xl">{description}</Text>
      </Flex>
    </Flex>
  );
};

export default ProductPage;
