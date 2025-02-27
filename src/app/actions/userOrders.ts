"use server";
import { prisma } from "@/lib/prisma";

export async function getUserOrders(userId: string) {
  let orders = await prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          movie: true, // Include movie details
        },
      },
    },
  });

  const today: Date = new Date();
  const shipped: string[] = [];
  const delivered: string[] = [];

  orders.map((order) => {
    const shippedDay: Date = order.createdAt;
    const deliveredDay: Date = order.createdAt;
    shippedDay.setDate(shippedDay.getDate() + 1);
    deliveredDay.setDate(deliveredDay.getDate() + 3);
    if (today < shippedDay && order.status === "PENDING") {
      shipped.push(order.id);
    } else if (today < deliveredDay && order.status === "SHIPPED") {
      delivered.push(order.id);
    }
  });
  try {
    let check = 0;
    if (shipped.length !== 0) {
      check = 1;
      await prisma.order.updateMany({
        where: {
          id: {
            in: shipped,
          },
        },
        data: {
          status: "SHIPPED",
        },
      });
      orders = await prisma.order.findMany({
        where: { userId },
        include: {
          items: {
            include: {
              movie: true, // Include movie details
            },
          },
        },
      });
    }
    if (delivered.length !== 0) {
      check = 1;
      await prisma.order.updateMany({
        where: {
          id: {
            in: delivered,
          },
        },
        data: {
          status: "DELIVERED",
        },
      });
    }
    if (check === 1) {
      orders = await prisma.order.findMany({
        where: { userId },
        include: {
          items: {
            include: {
              movie: true, // Include movie details
            },
          },
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
  return orders;
}

export async function getUserDetails(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
}

export async function UpdateUser(
  id: string,
  updatedData: { name: string; email: string; address?: string | null }
) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: updatedData.name,
        email: updatedData.email,
        address: updatedData.address ?? null,
      },
    });

    return {
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      success: false,
      message: "Failed to update user.",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
