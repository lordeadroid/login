import { Badge, Button, Flex, Image, Text } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TProductPage } from "../types";
import styles from "../style.module.css";
import { EMPTYSTRING, INITIALPRODUCTDATA, RATING } from "../utils/constant";

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

  const ratingColor = (rating: number): string => {
    if (rating >= 4) return RATING.good;
    if (rating >= 3) return RATING.okay;
    return RATING.poor;
  };

  return (
    <Flex gap={"xl"}>
      <Flex>
        <Button size={"xs"} pos={"fixed"} color={ratingColor(rating)}>
          {rating}
        </Button>
        <Flex
          h={"80vh"}
          w={"30vw"}
          justify={"center"}
          className={loadingStyle}
          style={{ borderRadius: "0.5rem" }}
        >
          <Image
            src={mainImage}
            radius={"md"}
            bg={"linear-gradient(transparent, whitesmoke 75%)"}
          />
        </Flex>
        <Flex direction={"column"}>
          {restImages.map((imageURL, index) => (
            <Flex
              h={"40vh"}
              w={"15vw"}
              className={loadingStyle}
              key={index}
              style={{ borderRadius: "0.5rem" }}
            >
              <Image
                src={imageURL}
                bg={`linear-gradient(${
                  180 * index
                }deg, transparent, whitesmoke 75%)`}
                loading="lazy"
              />
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Flex gap={"xs"} direction={"column"}>
        <Text fz={"h2"} fw={"700"} className={loadingStyle}>
          {title}
        </Text>
        <Flex className={styles.section} gap={"xs"}>
          {tags.map((tag, index) => {
            return (
              <Badge size="md" variant="light" key={index}>
                {tag}
              </Badge>
            );
          })}
        </Flex>
        <Text>{description}</Text>
      </Flex>
    </Flex>
  );
};

export default ProductPage;
