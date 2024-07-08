import {
  Text,
  Avatar,
  Group,
  TypographyStylesProvider,
  Paper,
  Box,
} from "@mantine/core";
import classes from "./comment.module.css";
import { TReview } from "../types";

const Comment = ({ review }: { review: TReview }) => {
  const avatarId = Math.floor(Math.random() * 10);
  const { comment, date, reviewerName } = review;

  return (
    <Paper withBorder radius="md" p={"lg"} w={"43vw"}>
      <Group>
        <Avatar
          // eslint-disable-next-line max-len
          src={`https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-${avatarId}.png`}
          alt="Person Image"
          radius="xl"
        />
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
