"use client";

import {
  //AddToCart,
  AddToCart2,
} from "@/app/actions/cart";
import { Button } from "../ui/button";
import { ShoppingBasket } from "lucide-react";

export default function AddToCartButton({ movieId }: { movieId: string }) {
  return (
    <Button
      variant={"green"}
      onClick={() =>
        //add movieId or whole movie to shopping cart
        {
          AddToCart2(movieId);
        }
      }
    >
      <ShoppingBasket />
    </Button>
  );
}
