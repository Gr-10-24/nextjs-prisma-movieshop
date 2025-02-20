"use client";

import {
  //AddToCart,
  AddToCart2,
} from "@/app/actions/cart";
import { Button } from "../ui/button";

export default function AddToCartButton({ movieId }: { movieId: string }) {
  return (
    <Button
      variant={"secondary"}
      onClick={() =>
        //add movieId or whole movie to shopping cart
        {
          AddToCart2(movieId);
        }
      }
    >
      <p>Add to Cart</p>
    </Button>
  );
}
