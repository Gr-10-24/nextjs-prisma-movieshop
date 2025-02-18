"use client";

import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

import { deleteCartItem } from "@/app/actions/cart";
import { CartItemFront } from "@/types/cartType";
//import { CartItem } from "@/types/cartType";

// type CartItemProps = {
//   cartItemId: string;
//   title: string;
//   quantity: number;
// };

// export default function CartItemCard({
//   cartItemId,
//   title,
//   quantity,
// }: CartItemProps) {
export default function CartItemCard({
  cartItem,
}: {
  cartItem: CartItemFront;
}) {
  return (
    <div
      key={cartItem.id}
      className="flex border-2 border-black rounded-md mx-auto p-2 m-1 gap-2 justify-between max-w-[600px]"
    >
      <div className="flex flex-col px-3">
        <div className="flex flex-col px-3">
          <p>Title: {cartItem.title}</p>
        </div>
        <div className="flex flex-col px-3">
          <p>quantity: {cartItem.quantity}</p>
        </div>
      </div>
      <div className="flex my-auto">
        <div className="flex my-auto">
          {/* <PeopleDialogD data={data.person} /> */}
        </div>

        <div className="flex my-auto">
          <Button
            variant={"destructive"}
            onClick={() => deleteCartItem(cartItem.id)}
          >
            <Trash2 />
          </Button>
        </div>
      </div>
    </div>
  );
}
