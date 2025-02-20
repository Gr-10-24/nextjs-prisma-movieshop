"use client";

import { CartFront } from "@/types/cartType";
import CartItemCard from "./cart-item-card";

export default function CartList({ cart }: { cart: CartFront }) {
  return (
    <div>
      <div className="Flex gap-2 m-2 p-2">
        {cart.cartItems.map((item) => (
          <CartItemCard key={item.id} cartItem={item} />
        ))}
      </div>
      <div>
        <h2>Total: {cart.total} SEK</h2>
      </div>
    </div>
  );
}
