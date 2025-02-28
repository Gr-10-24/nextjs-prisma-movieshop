"use client";

import { SquareX, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

import { deleteCartItem, updateQuantityItem } from "@/app/actions/cart";
import { CartItemFront } from "@/types/cartType";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getMovieStock } from "@/app/actions/viewmovie";

export default function CartItemCard({
  cartItem,
}: {
  cartItem: CartItemFront;
}) {
  const [q, setQ] = useState(cartItem.quantity);
  const [stock, setStock] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMovieStock(cartItem.movieId);
        setStock(result.stock);
      } catch (e) {
        throw e;
      }
    };
    fetchData();
  }, [cartItem.movieId]);
  //const stock = await getMovieStock(cartItem.movieId);
  return (
    <div
      key={cartItem.id}
      className="flex border-2 border-black rounded-md mx-auto p-2 m-1 gap-2 justify-between max-w-[600px]"
    >
      <div className="flex flex-row px-3">
        <div>
          {cartItem.imageUrl !== null ? (
            <Image
              src={cartItem.imageUrl}
              alt={"image missing"}
              className="object-cover"
              width={50}
              height={75}
              priority
            />
          ) : (
            <SquareX />
          )}
        </div>
        <div className="flex flex-col px-3 my-auto">
          <p>
            Title:{" "}
            {cartItem.title.length < 10
              ? cartItem.title
              : cartItem.title.substring(0, 7) + "..."}
          </p>
        </div>
        <div className="flex flex-row px-3">
          <div className="my-auto">
            <p>quantity:</p>
          </div>
          <div className="my-auto">
            <Input
              key={cartItem.id}
              name={"quantity"}
              id={"quantity"}
              type={"number"}
              min={0}
              max={stock}
              //max={100}
              value={q}
              onChange={async (e) => {
                setQ(Number(e.target.value));
                await updateQuantityItem(
                  cartItem.id,
                  cartItem.movieId,
                  Number(e.target.value)
                );
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex my-auto">
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
