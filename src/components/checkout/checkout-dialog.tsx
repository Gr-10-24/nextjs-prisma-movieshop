"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CartFront } from "@/types/cartType";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function PeopleDialog({ cart }: { cart: CartFront }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="border-2">Checkout</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        insert here
      </DialogContent>
    </Dialog>
  );
}
