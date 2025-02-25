"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CartFront } from "@/types/cartType";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export async function Checkout(cart: CartFront) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session === null) {
    return "not logged in";
  }
  try {
    const order = await prisma.order.create({
      data: {
        userId: session?.user.id,
        status: "PENDING",
        totalAmount: cart.total,
      },
    });

    cart.cartItems.map(async (item) => {
      await prisma.orderItem.create({
        data: {
          movieId: item.movieId,
          orderId: order.id,
          price: item.price,
        },
      });
      await prisma.movie.update({
        where: { id: item.movieId },
        data: { stock: { decrement: item.quantity } },
      });
    });

    const cookieStore = await cookies();
    const cartId = cookieStore.get("cartId")?.value;

    await prisma.cart.delete({
      where: {
        id: cartId,
      },
    });

    cookieStore.delete("cartId");

    revalidatePath("/");
  } catch (e) {
    throw e;
  }

  redirect("/");
}
