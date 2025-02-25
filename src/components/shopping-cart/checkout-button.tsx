"use client";

import { Button } from "../ui/button";
import { CartFront } from "@/types/cartType";
import { Checkout } from "@/app/actions/checkout";

export default function CheckoutButton({ cart }: { cart: CartFront }) {
  return (
    <Button
      onClick={() =>
        //add movieId or whole movie to shopping cart
        {
          Checkout(cart);
        }
      }
    >
      Checkout
    </Button>
  );
}
