"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function Getban() {
    try {
        return await prisma.user.findMany({
            where: {
                banned: true,
            },
        });
    } catch (error) {
        console.error("Error fetching banned users:", error);
        return [];
    }
}

export async function UpdateTodo(id: string) {
    try {
      await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          banned: false,
          banReason: null,
          banExpires: null
        },
      });
      
      // Revalidate the page to show updated data
      revalidatePath("/");
      return { success: true };
    } catch (error) {
      console.error("Error unbanning user:", error);
      return { success: false, error: "Failed to unban user" };
    }
  }
  

export async function Updateban(email: string, updatedData: { banReason: string; banExpires: Date; }) {
    try {
        // Find user by email to get userId
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true },
        });

        if (!user) {
            return { success: false, message: "User not found." };
        }

        // Update the user's ban status
        await prisma.user.update({
            where: { email },
            data: {
                banned: true,
                banReason: updatedData.banReason,
                banExpires: updatedData.banExpires,
            },
        });

        // Delete all active sessions for the banned user
        await prisma.session.deleteMany({
            where: { userId: user.id },
        });

        // Note: We can't directly set cookies in server actions
        // The cookie will be handled by the client-side after redirection

        // Revalidate cache for updated UI
        revalidatePath("/");

        return { success: true, message: "User has been banned successfully and sessions deleted." };
    } catch (error) {
        console.error("Error banning user:", error);
        return { success: false, message: "Failed to ban user." };
    }
}