"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function getOrCreateCart() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;
  if (cartId) {
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: { CartItems: true },
    });
    if (cart) return cart;
  }

  const cart = await prisma.cart.create({
    data: { total: 0.0 },
    include: { CartItems: true },
  });
  cookieStore.set("cartId", cart.id);

  return cart;
}

export async function AddToCart(movieId: string) {
  const cart = await getOrCreateCart();

  const existingItems = await prisma.cartitems.findFirst({
    where: {
      cartId: cart.id,
      movieId: movieId,
    },
  });

  if (existingItems) {
    await prisma.cartitems.update({
      where: { id: existingItems.id },
      data: { quantity: existingItems.quantity + 1 },
    });
  } else {
    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
    });
    if (movie) {
      await prisma.cartitems.create({
        data: {
          cartId: cart.id,
          movieId,
          quantity: 1,
          price: movie.price,
        },
      });
    }
  }
  updateCartTotal();
}

export async function updateCartTotal() {
  const cart = await getOrCreateCart();

  let total = 0.0;
  cart.CartItems.map((cartItem) => (total = total + Number(cartItem.price)));

  await prisma.cart.update({
    where: { id: cart.id },
    data: { total },
  });
}

export async function deleteCartItem(cartItemId: string) {
  await prisma.cartitems.delete({
    where: { id: cartItemId },
  });
}
