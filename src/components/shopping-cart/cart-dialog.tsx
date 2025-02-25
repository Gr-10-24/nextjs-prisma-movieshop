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
import { useState } from "react";
import Link from "next/link";

export function CartDialog({ cart }: { cart: CartFront }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"green"} className="border-2 border-black">
          <ShoppingBasket />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <CartList cart={cart} />
        <Link className="m-auto" href="/checkout">
          <Button onClick={() => setOpen(false)}>Go to Checkout</Button>
        </Link>
      </DialogContent>
    </Dialog>
  );
}
