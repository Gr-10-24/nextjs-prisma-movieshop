"use server";
import { prisma } from "@/lib/prisma";

export async function getUserOrders(userId: string) {
  return await prisma.order.findMany({
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

export async function UpdateUser(id: string, updatedData: { name: string; email: string; address?: string | null}) {
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