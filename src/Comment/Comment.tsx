import classes from "./comment.module.css";
import { TReview } from "../types";
import { CreateAvatar } from "../Lib";
import { SIZE } from "../utils/constant";
import {
  Text,
  Group,
  TypographyStylesProvider,
  Paper,
  Box,
} from "@mantine/core";

const Comment = ({ review }: { review: TReview }) => {
  const { comment, date, reviewerName } = review;

  return (
    <Paper withBorder radius={SIZE.medium} p={SIZE.large} w={"43vw"}>
      <Group>
        <CreateAvatar />
        <Box>
          <Text fz={SIZE.small}>{reviewerName}</Text>
          <Text fz={SIZE.extraSmall} c="dimmed">
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
