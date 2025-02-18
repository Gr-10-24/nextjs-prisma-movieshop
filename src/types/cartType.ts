import { getCart2, getCartItem } from "@/app/actions/cart";

// export type Cart = Awaited<ReturnType<typeof getOrCreateCart>>;
// export type CartItem = Awaited<ReturnType<typeof getCartItem>>;
//export type Cart = Awaited<ReturnType<typeof getCart>>;
export type Cart2 = Awaited<ReturnType<typeof getCart2>>;
export type CartItem = Awaited<ReturnType<typeof getCartItem>>;

export type CartFront = {
  id: string;
  total: number;
  cartItems: CartItemFront[];
};

export type CartItemFront = {
  id: string;
  quantity: number;
  price: number;
  movieId: string;
  cartId: string;

  title: string;
};
