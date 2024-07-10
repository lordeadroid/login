import { notifyUser } from "./utils/utils";
import { Avatar, Button } from "@mantine/core";
import { EMPTYSTRING, NOTIFICATION_MSG } from "./utils/constant";
import { useDatabaseStore, useLoginStore } from "./utils/use-store";
import { TAddToCartButton, TButton, TSignupFormData } from "./types";

export const CreateButton = (props: TButton) => {
  const { value, color, handleClick, size = "xs", w = EMPTYSTRING } = props;

  return (
    <Button size={size} color={color} w={w} onClick={handleClick}>
      {value}
    </Button>
  );
};

export const AddToCartButton = (props: TAddToCartButton) => {
  const { productName, id, size = "xs" } = props;
  const username = useLoginStore((state) => state.username);
  const entries = useDatabaseStore((state) => state.entries);
  const addItemToCart = useDatabaseStore((state) => state.addItemToCart);

  const { cart } =
    (entries.find((entry) => entry.username === username) as TSignupFormData) ||
    [];

  const handleClick = () => {
    addItemToCart(username, id);
    notifyUser(productName, NOTIFICATION_MSG.cart.success);
  };

  return cart.includes(id) ? (
    <CreateButton size={size} color="lime" value="Added" />
  ) : (
    <CreateButton
      value="Add"
      size={size}
      color="indigo"
      handleClick={handleClick}
    />
  );
};

export const CreateAvatar = () => {
  const avatarId = Math.floor(Math.random() * 10);

  // eslint-disable-next-line max-len
  const avatarURL = `https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-${avatarId}.png`;

  return <Avatar src={avatarURL} radius="xl" />;
};
