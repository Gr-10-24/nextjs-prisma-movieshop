"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ShoppingBasket } from "lucide-react";
import { CartFront } from "@/types/cartType";
import CartList from "./cart-list";

export function CartDialog({ cart }: { cart: CartFront }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="border-2">
          <ShoppingBasket />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <CartList cart={cart} />
      </DialogContent>
    </Dialog>
  );
}
