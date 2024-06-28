import { Flex, Image } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TProductPage } from "../types";
import styles from "../style.module.css";
import { EMPTYSTRING, INITIALPRODUCTDATA } from "../utils/constant";

const ProductPage = () => {
  const { id } = useParams();
  const url = `https://dummyjson.com/products/${id}`;
  const [isFetching, setFetching] = useState<boolean>(true);
  const [productData, setProductData] =
    useState<TProductPage>(INITIALPRODUCTDATA);

  const [mainImage, ...restImages] = productData.images;
  const loadingStyle = isFetching ? styles.skeletonLoading : EMPTYSTRING;

  useEffect(() => {
    axios.get(url).then(({ data }) => {
      setProductData(data);
      setFetching(false);
    });
  }, [url]); // ?

  return (
    <Flex>
      <Flex
        h={"50rem"}
        w={"40rem"}
        justify={"center"}
        className={loadingStyle}
        style={{ borderRadius: "1rem" }}
      >
        <Image
          src={mainImage}
          radius={"md"}
          bg={"linear-gradient(transparent, aliceblue 75%)"}
        />
      </Flex>
      <Flex direction={"column"}>
        {restImages.map((imageURL, index) => (
          <Flex
            h={"25rem"}
            w={"25rem"}
            className={loadingStyle}
            key={index}
            style={{ borderRadius: "1rem" }}
          >
            <Image
              src={imageURL}
              bg={"linear-gradient(135deg, transparent 50%, whitesmoke)"}
              loading="lazy"
            />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default ProductPage;
