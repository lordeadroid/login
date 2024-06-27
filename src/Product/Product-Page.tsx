import { Flex, Image, Text } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TProductPage } from "../types";

const ProductPage = () => {
  const { id } = useParams();
  const url = `https://dummyjson.com/products/${id}`;
  const [isFetching, setFetching] = useState<boolean>(true);
  const [productData, setProductData] = useState<TProductPage>(
    {} as TProductPage
  );

  useEffect(() => {
    axios.get(url).then(({ data }) => {
      setProductData(data);
      setFetching(false);
    });
  }, [url]);

  const Page = () => {
    const [bannerImage, ...restImages] = productData.images;

    return (
      <Flex>
        <Flex
          h={"50rem"}
          w={"40rem"}
          justify={"center"}
          bg={"linear-gradient(-45deg, transparent 90%, aliceblue)"}
        >
          <Image src={bannerImage} radius={"md"} />
        </Flex>

        <Flex direction={"column"}>
          {restImages.map((image, index) => {
            return (
              <Image
                src={image}
                h={"25rem"}
                w={"25rem"}
                radius={"lg"}
                key={index}
                bg={"linear-gradient(135deg, transparent 50%, whitesmoke)"}
              />
            );
          })}
        </Flex>
      </Flex>
    );
  };

  return isFetching ? <Text>Loading</Text> : <Page />;
};

export default ProductPage;
