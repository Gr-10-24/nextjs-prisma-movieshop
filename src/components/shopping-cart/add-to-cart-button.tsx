"use client";

import { AddToCart } from "@/app/actions/cart";
import { Button } from "../ui/button";

export default function AddToCartButton({ movieId }: { movieId: string }) {
  return (
    <Button
      variant={"secondary"}
      onClick={() =>
        //add movieId or whole movie to shopping cart
        {
          AddToCart(movieId);
        }
      }
    >
      <p>Add to Cart</p>
    </Button>
  );
}
