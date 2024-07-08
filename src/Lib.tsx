import { Button } from "@mantine/core";
import { useDatabaseStore, useLoginStore } from "./utils/use-store";
import { TAddToCartButton, TButton, TSignupFormData } from "./types";

export const CreateButton = (props: TButton) => {
  const { value, size = "xs", color, handleClick } = props;

  return (
    <Button size={size} color={color} onClick={handleClick}>
      {value}
    </Button>
  );
};

export const AddToCartButton = (props: TAddToCartButton) => {
  const { id, size = "xs" } = props;
  const username = useLoginStore((state) => state.username);
  const entries = useDatabaseStore((state) => state.entries);
  const addItemToCart = useDatabaseStore((state) => state.addItemToCart);

  const { cart } =
    (entries.find((entry) => entry.username === username) as TSignupFormData) ||
    [];

  return cart.includes(id) ? (
    <CreateButton size={size} color="lime" value="Added" />
  ) : (
    <CreateButton
      value="Add"
      size={size}
      color="indigo"
      handleClick={() => addItemToCart(username, id)}
    />
  );
};
