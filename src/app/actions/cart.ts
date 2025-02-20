"use server";

import { prisma } from "@/lib/prisma";
import {
  //Cart,
  Cart2,
  CartFront,
  CartItem,
  CartItemFront,
} from "@/types/cartType";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
//import { useEffect } from "react";

// export async function getOrCreateCart() {
//   const cookieStore = await cookies();
//   const cartId = cookieStore.get("cartId")?.value;
//   // if (cartId) {
//   //   const cart = await prisma.cart.findUnique({
//   //     where: { id: cartId },
//   //     include: { CartItems: true },
//   //   });
//   //   if (cart) return cart;
//   // }
//   if (cartId) {
//     // const cart = await prisma.cart.findUnique({
//     //   where: { id: cartId },
//     //   include: {
//     //     CartItems: { include: { movie: { select: { title: true } } } },
//     //   },
//     // });
//     const cart = await getCart(cartId);
//     if (cart !== undefined) return convertCart(cart);
//   }

//   // const cart2 = await prisma.cart.create({
//   //   data: { total: 0.0 },
//   //   include: { CartItems: true },
//   // });

//   // const cart = await prisma.cart.create({
//   //   data: { total: 0.0 },
//   //   include: { CartItems: { include: { movie: true } } },
//   // });
//   const cart = await setCart();
//   cookieStore.set("cartId", cart.id);

//   return convertCart(cart);
// }

export async function getOrCreateCart() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;
  if (cartId) {
    const cart = await getCart2(cartId);
    return convertCart2(cart);
  }
  const cart = await setCart2();
  cookieStore.set("cartId", cart.id);

  return convertCart2(cart);
}

export async function getCartFront() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;
  if (cartId) {
    const cart = await getCart2(cartId);
    return convertCart2(cart);
  }
}

// export async function getCart(id: string) {
//   const cart = await prisma.cart.findUniqueOrThrow({
//     where: { id },
//     include: {
//       CartItems: { include: { movie: { select: { title: true } } } },
//     },
//   });
//   if (cart) return cart;
// }

export async function getCart2(id: string) {
  try {
    return await prisma.cart.findUniqueOrThrow({
      where: { id },
      include: {
        CartItems: {
          include: {
            movie: {
              select: { title: true, description: true, imageUrl: true },
            },
          },
        },
      },
    });
  } catch (e) {
    throw e;
  }
}

export async function setCart() {
  const cart = await prisma.cart.create({
    data: { total: 0.0 },
    include: { CartItems: { include: { movie: true } } },
  });
  return cart;
}

export async function setCart2() {
  try {
    const cart = await prisma.cart.create({
      data: { total: 0.0 },
      include: { CartItems: { include: { movie: true } } },
    });
    return cart;
  } catch (e) {
    throw e;
  }
}

export async function getCartItem(id: string) {
  const cartItem = await prisma.cartitems.findUniqueOrThrow({
    where: { id },
    include: {
      movie: { select: { title: true, description: true, imageUrl: true } },
    },
  });
  return cartItem;
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
  await updateCartTotal();
}

export async function updateCartTotal() {
  const cart = await getOrCreateCart();

  let total = 0.0;
  cart.cartItems.map((cartItem) => (total = total + Number(cartItem.price)));

  await prisma.cart.update({
    where: { id: cart.id },
    data: { total },
  });
}

export async function deleteCartItem(cartItemId: string) {
  await prisma.cartitems.delete({
    where: { id: cartItemId },
  });
  //revalidatePath("/"); this might be needed?
}

// export function convertCart(cart: Cart): CartFront | undefined {
//   if (cart !== undefined) {
//     const newCart: CartFront = {
//       id: cart.id,
//       total: Number(cart.total),
//       cartItems: [],
//     };
//     cart.CartItems.forEach((item) => {
//       const tmp = convertCartItem(item);
//       if (tmp !== undefined) {
//         newCart.cartItems.push(tmp);
//       }
//     });

//     return newCart;
//   } else return undefined;
// }

export async function convertCart2(cart: Cart2): Promise<CartFront> {
  try {
    const newCart: CartFront = {
      id: cart.id,
      total: Number(cart.total),
      cartItems: [],
    };
    cart.CartItems.forEach(async (item) => {
      const tmp = await convertCartItem2(item);
      newCart.cartItems.push(tmp);
    });

    return newCart;
  } catch (e) {
    throw e;
  }
}

// interface CartFront2 {
//   id: string;
//   total: number;
//   cartItems: CartItemFront[];
// };

// interface CartItemFront2 {
//   id: string;
//   quantity: number;
//   price: number;
//   movieId: string;
//   cartId: string;

//   title: string;
// };

// export function convertCartItem(cartItem: CartItem): CartItemFront | undefined {
//   if (cartItem !== null) {
//     const newCartItem: CartItemFront = {
//       id: cartItem.id,
//       quantity: Number(cartItem.quantity),
//       price: Number(cartItem.price),
//       movieId: cartItem.movieId,
//       cartId: cartItem.cartId,

//       title: cartItem.movie.title,
//     };
//     return newCartItem;
//   } //else return undefined;
// }

export async function convertCartItem2(
  cartItem: CartItem
): Promise<CartItemFront> {
  try {
    const newCartItem: CartItemFront = {
      id: cartItem.id,
      quantity: Number(cartItem.quantity),
      price: Number(cartItem.price),
      movieId: cartItem.movieId,
      cartId: cartItem.cartId,

      title: cartItem.movie.title,
      description: cartItem.movie.description,
      imageUrl: cartItem.movie.imageUrl,
    };
    return newCartItem;
  } catch (e) {
    throw e;
  }
}

//-----------------------------------------------------------------------------

export async function getCart() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  if (!cartId) return null;
  return await prisma.cart.findUnique({
    where: { id: cartId },
    include: {
      CartItems: {
        include: {
          movie: {
            select: {
              id: true,
              title: true,
              description: true,
              imageUrl: true,
            },
          },
        },
      },
    },
  });
}

async function createCart() {
  return await prisma.cart.create({
    data: { total: 0.0 },
    include: { CartItems: true },
  });
}

export async function AddToCart2(movieId: string) {
  const cookieStore = await cookies();
  const existingCart = await getCart();
  const cart = existingCart || (await createCart());

  if (!existingCart) {
    cookieStore.set("cartId", cart.id);
  }

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
          movieId: movieId,
          quantity: 1,
          price: movie.price,
        },
      });
    }
  }
  updateCartTotal2();
  revalidatePath("/", "layout");
}

export async function updateCartTotal2() {
  const cart = await getCart();
  if (cart !== null) {
    let total = 0.0;
    cart.CartItems.map(
      (cartItem) => (total = total + Number(cartItem.price) * cartItem.quantity)
    );

    await prisma.cart.update({
      where: { id: cart.id },
      data: { total },
    });
  }
}

export async function updateQuantityItem(id: string, quantity: number) {
  if (quantity < 1) {
    await deleteCartItem(id);
  } else {
    await prisma.cartitems.update({
      where: { id },
      data: { quantity },
    });
  }
  updateCartTotal2();
  revalidatePath("/", "layout");
}
