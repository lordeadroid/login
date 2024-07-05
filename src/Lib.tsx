import { Button } from "@mantine/core";
import { useDatabaseStore, useLoginStore } from "./utils/use-store";
import { TAddToCartButton, TSignupFormData } from "./types";
import { ratingColor } from "./utils/utils";

export const AddToCartButton = (props: TAddToCartButton) => {
  const { id, size = "xs" } = props;
  const username = useLoginStore((state) => state.username);
  const entries = useDatabaseStore((state) => state.entries);
  const addItemToCart = useDatabaseStore((state) => state.addItemToCart);

  const { cart } =
    (entries.find((entry) => entry.username === username) as TSignupFormData) ||
    [];

  return cart.includes(id) ? (
    <Button size={size} color="lime">
      Added
    </Button>
  ) : (
    <Button
      size={size}
      color="indigo"
      onClick={() => addItemToCart(username, id)}
    >
      Add
    </Button>
  );
};

export const RatingButton = ({ rating }: { rating: number }) => {
  return (
    <Button size={"xs"} color={ratingColor(rating)}>
      {rating}
    </Button>
  );
};
