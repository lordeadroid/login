import axios from "axios";
import styles from "../style.module.css";
import Comment from "../Comment/Comment";
import { TProductPage, TReview } from "../types";
import { useParams } from "react-router-dom";
import { ratingColor } from "../utils/utils";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { AddToCartButton, CreateButton } from "../Lib";
import { EMPTYSTRING, INITIALPRODUCTDATA } from "../utils/constant";
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
      p={"xl"}
      bd={"1px solid black"}
      style={{ borderRadius: "1rem" }}
    >
      <Title pb={"2rem"}>Comments</Title>
      <Flex wrap={"wrap"} gap={"md"}>
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
    <Flex gap={"xl"} direction={"column"}>
      <Flex gap={"xl"}>
        <Flex gap={"md"}>
          <Flex direction={"column"} gap={"1rem"}>
            {images.map((imgUrl, index) => {
              const isSelectedImg = selectedImg === index;
              return (
                <Skeleton visible={isFetching}>
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
                size="sm"
                handleClick={() => {
                  commentsRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                color={ratingColor(rating)}
              />
            </Flex>
            <Skeleton visible={isFetching}>
              <Flex h={"47rem"} w={"40rem"}>
                <Image src={images[selectedImg]} />
              </Flex>
            </Skeleton>
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
