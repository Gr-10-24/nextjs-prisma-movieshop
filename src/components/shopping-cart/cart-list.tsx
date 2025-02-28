"use client";

import { CartFront } from "@/types/cartType";
import CartItemCard from "./cart-item-card";
import { useMemo } from "react";
// import { Button } from "../ui/button";
// import Link from "next/link";

export default function CartList({ cart }: { cart: CartFront }) {
  const sortedCartItems = useMemo(() => {
    return [...cart.cartItems].sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
  }, [cart.cartItems]);
  return (
    <div>
      <div className="Flex gap-2 m-2 p-2">
        {sortedCartItems.map((item) => (
          <CartItemCard key={item.id} cartItem={item} />
        ))}
      </div>
      <div>
        <h2>Total: {cart.total} SEK</h2>
      </div>
      <div>
        {/* <Link href="/checkout">
          <Button>Go to Checkout</Button>
        </Link> */}
      </div>
    </div>
  );
}
