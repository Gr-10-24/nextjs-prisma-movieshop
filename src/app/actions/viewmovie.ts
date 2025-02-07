"use server"

import { Prisma, PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { number } from "zod";

const prisma = new PrismaClient();
export type MovieData = {
    id: string;
    title: string;
    description: string;
    imageUrl?: string | null;
    price: number; // Converted from Decimal to number
    stock: number;
    releaseDate: number;
    runtime: string;
};

export async function GetMovie(): Promise<MovieData[]> {
    const movies = await prisma.movie.findMany();

    return movies.map(movie => ({
        id: movie.id,
        title: movie.title,
        description: movie.description,
        imageUrl: movie.imageUrl,
        price: movie.price.toNumber(), // Convert price to number
        stock: movie.stock,
        releaseDate: movie.releaseDate, 
        runtime: movie.runtime,
    }));
}

export async function DeleteTodo(id: string) {
    await prisma.movie.delete({
      where: {
        id,
      },
    });
    revalidatePath("/");
  }
  export async function UpdateTodo(
    id: string,
    updatedData: {
      title: string;
      description: string;
      imageurl: string | null;
      price: number;
      stock: number;
      release: number;
      runtime: string;
    }
  ) {
    try {
      

      const priceDecimal = new Prisma.Decimal(updatedData.price);
      const updatedMovie = await prisma.movie.update({
        where: {
          id: id, // Use the movie id to find the record to update
        },
        data: {
          title: updatedData.title,
          description: updatedData.description,
          imageUrl: updatedData.imageurl,
          price:Number(updatedData.release),
          stock: Number(updatedData.stock),
          releaseDate: Number(updatedData.release),
          runtime: updatedData.runtime,
        },
      });

      revalidatePath("/");
  
      // You can return the updated movie if needed
      return updatedMovie;
    }catch (error) {
       /* console.error("Error adding movie:", error);
        return {
          success: false,
          message: "Failed to update movie.",
        };
        */
      }
  }