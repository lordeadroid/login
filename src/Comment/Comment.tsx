import {
  Text,
  Group,
  TypographyStylesProvider,
  Paper,
  Box,
} from "@mantine/core";
import classes from "./comment.module.css";
import { TReview } from "../types";
import { CreateAvatar } from "../Lib";

const Comment = ({ review }: { review: TReview }) => {
  const { comment, date, reviewerName } = review;

  return (
    <Paper withBorder radius="md" p={"lg"} w={"43vw"}>
      <Group>
        <CreateAvatar />
        <Box>
          <Text fz="sm">{reviewerName}</Text>
          <Text fz="xs" c="dimmed">
            {date}
          </Text>
        </Box>
      </Group>
      <TypographyStylesProvider className={classes.body}>
        <Text className={classes.content}>{comment}</Text>
      </TypographyStylesProvider>
    </Paper>
  );
};

export default Comment;
