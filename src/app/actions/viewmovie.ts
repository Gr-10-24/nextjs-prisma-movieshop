"use server";

import { Prisma, PrismaClient, Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const updateMovieSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(2, { message: "Title must be at least 2 characters." }),

  description: z
    .string({ required_error: "Description is required" })
    .min(5, { message: "Description must be at least 5 characters." }),

  imageurl: z.string().url("Invalid URL").nullable().or(z.literal("")),

  price: z
    .number({ required_error: "Price is required" })
    .positive({ message: "Price must be a positive number" })
    .min(1, { message: "Price must be at least 1." }),

  stock: z
    .number({ required_error: "Stock is required" })
    .int({ message: "Stock must be an integer" })
    .min(0, { message: "Stock cannot be negative" }),

  release: z
    .number({ required_error: "Release year is required" })
    .int({ message: "Release year must be an integer" })
    .min(1900, { message: "Invalid release year" })
    .max(new Date().getFullYear(), { message: "Future years are not allowed" }),

  runtime: z
    .string({ required_error: "Runtime is required" })
    .min(1, { message: "Runtime is required and must be a valid duration" }),
});

const prisma = new PrismaClient();
export type MovieData = {
  id: string;
  title: string;
  description: string;
  genres: { id: string; name: string }[];
  imageUrl?: string | null;
  price: number; // Converted from Decimal to number
  stock: number;
  releaseDate: number;
  runtime: string;
  starring: Array<{
    role: Role;
    person: {
      id: string;
      name: string;
    };
  }>;
};

export async function GetMovie(): Promise<MovieData[]> {
  const movies = await prisma.movie.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      imageUrl: true,
      price: true,
      stock: true,
      releaseDate: true,
      runtime: true,
      genre: {
        select: {
          id: true,
          name: true,
        },
      },
      starring: {
        select: {
          role: true,
          person: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  /* */
  return movies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    description: movie.description,
    genres: movie.genre,
    starring: movie.starring,
    imageUrl: movie.imageUrl,
    price: movie.price.toNumber(), // Convert price to number
    stock: movie.stock,
    releaseDate: movie.releaseDate,
    runtime: movie.runtime,
  }));
}

export async function DeleteTodo(id: string) {
  await prisma.starring.deleteMany({
    where: {
      movieId: id,
    },
  });
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
  console.log("Calling UpdateTodo with:", id, updatedData);
  try {
    const parsedData = updateMovieSchema.safeParse(updatedData);

    if (!parsedData.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: parsedData.error.format(),
      };
    }

    await prisma.movie.update({
      where: {
        id: id, // Use the movie id to find the record to update
      },
      data: {
        title: parsedData.data.title,
        description: parsedData.data.description,
        imageUrl: parsedData.data.imageurl,
        price: new Prisma.Decimal(parsedData.data.price),
        stock: parsedData.data.stock,
        releaseDate: parsedData.data.release,
        runtime: parsedData.data.runtime,
      },
    });

    revalidatePath("/");

    // You can return the updated movie if needed
  } catch (error) {
    console.error("Error adding movie:", error);
    return {
      success: false,
      message: "Failed to update movie.",
    };
  }
}
