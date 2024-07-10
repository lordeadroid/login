import { Image, Title, Text, Button, SimpleGrid, Flex } from "@mantine/core";
import styles from "./error.module.css";
import { PATH } from "../utils/constant";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  const image = "https://ui.mantine.dev/_next/static/media/image.11cd6c19.svg";

  return (
    <Flex p={"10rem"} className={styles.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src={image} className={styles.mobileImage} alt="404 error" />
        <div>
          <Title className={styles.title}>Something is not right...</Title>
          <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL.
          </Text>
          <Link to={PATH.home}>
            <Button
              variant="outline"
              size="md"
              mt="xl"
              className={styles.control}
            >
              Back to home page
            </Button>
          </Link>
        </div>
        <Image src={image} className={styles.desktopImage} alt="404 error" />
      </SimpleGrid>
    </Flex>
  );
};

export default ErrorPage;
