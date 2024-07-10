import axios from "axios";
import styles from "../style.module.css";
import Comment from "../Comment/Comment";
import { TProductPage, TReview } from "../types";
import { useParams } from "react-router-dom";
import { ratingColor } from "../utils/utils";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { AddToCartButton, CreateButton } from "../Lib";
import { EMPTYSTRING, INITIALPRODUCTDATA, SIZE } from "../utils/constant";
import {
  Badge,
  Flex,
  Group,
  Image,
  List,
  ListItem,
  Skeleton,
  Text,
  Title,
} from "@mantine/core";

const CommentSection = (props: {
  commentsRef: MutableRefObject<HTMLDivElement | null>;
  reviews: TReview[];
}) => {
  const { commentsRef, reviews } = props;
  return (
    <Flex
      ref={commentsRef}
      direction={"column"}
      bg={"whitesmoke"}
      p={SIZE.extraLarge}
      bd={"1px solid black"}
      style={{ borderRadius: "1rem" }}
    >
      <Title pb={"2rem"}>Comments</Title>
      <Flex wrap={"wrap"} gap={SIZE.medium}>
        {reviews.map((review, index) => (
          <Comment key={index} review={review} />
        ))}
      </Flex>
    </Flex>
  );
};

const ProductPage = () => {
  const { id } = useParams();
  const url = `https://dummyjson.com/products/${id}`;
  const commentsRef = useRef<HTMLDivElement | null>(null);
  const [selectedImg, setSelectedImg] = useState<number>(0);
  const [isFetching, setFetching] = useState<boolean>(true);
  const [productData, setProductData] =
    useState<TProductPage>(INITIALPRODUCTDATA);

  const loadingStyle = isFetching ? styles.skeletonLoading : EMPTYSTRING;

  const {
    tags,
    price,
    stock,
    title,
    images,
    rating,
    reviews,
    dimensions,
    description,
    returnPolicy,
    availabilityStatus,
    shippingInformation,
    warrantyInformation,
  } = productData;
  const { height, width, depth } = dimensions;

  useEffect(() => {
    axios.get(url).then(({ data }) => {
      setProductData(data);
      setFetching(false);
    });
  }, [url]);

  return (
    <Flex gap={SIZE.extraLarge} direction={"column"}>
      <Flex gap={SIZE.extraLarge}>
        <Flex gap={SIZE.medium}>
          <Flex direction={"column"} gap={"1rem"}>
            {images.map((imgUrl, index) => {
              const isSelectedImg = selectedImg === index;
              return (
                <Skeleton visible={isFetching} key={index}>
                  <Flex
                    h={"15rem"}
                    w={"10rem"}
                    onClick={() => setSelectedImg(index)}
                  >
                    <Image
                      alt={`Image of ${title}`}
                      src={imgUrl}
                      radius={SIZE.small}
                      bg={isSelectedImg ? "white" : "whitesmoke"}
                      bd={
                        isSelectedImg ? "1px solid black" : "1px solid darkgray"
                      }
                    />
                  </Flex>
                </Skeleton>
              );
            })}
          </Flex>
          <Flex
            pos={"relative"}
            justify={"center"}
            className={loadingStyle}
            bd={"1px solid gray"}
          >
            <Flex pos={"absolute"} left={8} top={8} style={{ zIndex: 1 }}>
              <CreateButton
                value={`${rating}`}
                size={SIZE.small}
                handleClick={() => {
                  commentsRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                color={ratingColor(rating)}
              />
            </Flex>
            <Skeleton visible={isFetching}>
              <Flex h={"47rem"} w={"40rem"}>
                <Image src={images[selectedImg]} alt={`Image of ${title}`} />
              </Flex>
            </Skeleton>
          </Flex>
        </Flex>
        <Flex
          gap={SIZE.large}
          direction={"column"}
          justify={"space-between"}
          p={SIZE.extraLarge}
          bd={"1px solid gray"}
          style={{ borderRadius: "0.5rem" }}
        >
          <Flex direction={"column"} gap={SIZE.large}>
            <Title className={loadingStyle}>{title}</Title>
            <Group>
              <Badge color="green" size={SIZE.large}>
                {availabilityStatus}
              </Badge>
              <Badge variant="dot" color="green" size={SIZE.large}>
                {stock}
              </Badge>
            </Group>
            <Group>
              <Flex className={styles.section} gap={SIZE.extraSmall}>
                {tags.map((tag, index) => {
                  return (
                    <Badge size={SIZE.extraLarge} variant="light" key={index}>
                      {tag}
                    </Badge>
                  );
                })}
              </Flex>
            </Group>
            <Text size={SIZE.extraLarge}>{description}</Text>
            <Group>
              <CreateButton
                value={`$ ${price}`}
                size={SIZE.medium}
                color="teal"
              />
              <AddToCartButton
                id={Number(id)}
                productName={title}
                size={SIZE.medium}
              />
            </Group>
          </Flex>
          <Flex
            direction={"column"}
            p={SIZE.extraLarge}
            bd={"1px solid darkgray"}
            bg={"rgb(255, 244, 244)"}
            style={{ borderRadius: "0.5rem" }}
          >
            <Text fw={700}>Additional Product Details</Text>
            <Flex direction={"column"} p={SIZE.extraSmall}>
              <List spacing={SIZE.extraSmall}>
                <ListItem>Product Dimensions</ListItem>
                <Flex direction={"column"} p={"0 25"}>
                  <Text>Height: {height}</Text>
                  <Text>Width: {width}</Text>
                  <Text>Depth: {depth}</Text>
                </Flex>
                <ListItem>{warrantyInformation}</ListItem>
                <ListItem>{shippingInformation}</ListItem>
                <ListItem>{returnPolicy}</ListItem>
              </List>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <CommentSection commentsRef={commentsRef} reviews={reviews} />
    </Flex>
  );
};

export default ProductPage;
