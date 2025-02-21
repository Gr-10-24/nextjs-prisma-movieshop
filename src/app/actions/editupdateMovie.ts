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

  genres: z
    .string({ required_error: "Genres are required" })
    .min(1, { message: "At least one genre is required" }),

  actors: z
    .string({ required_error: "Genres are required" })
    .min(1, { message: "At least one genre is required" }),
  directors: z
    .string({ required_error: "Genres are required" })
    .min(1, { message: "At least one genre is required" }),

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
    price:
      movie.price instanceof Prisma.Decimal
        ? movie.price.toNumber()
        : Number(movie.price), // Convert price to number
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
/// from here start update function
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
    genres: string;
  }
) {
  try {
    const parsedData = updateMovieSchema.safeParse(updatedData);

    if (!parsedData.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: parsedData.error.format(),
      };
    }

    // Parse genres string into array
    const genreNames = parsedData.data.genres
      .split(",")
      .map((g) => g.trim())
      .filter((g) => g.length > 0);

    // First, disconnect all existing genres
    await prisma.movie.update({
      where: { id },
      data: {
        genre: {
          disconnect: await prisma.movie
            .findUnique({
              where: { id },
              select: {
                genre: {
                  select: { id: true },
                },
              },
            })
            .then((movie) => movie?.genre || []),
        },
      },
    });

    // Then process new genres
    const genreConnections = await Promise.all(
      genreNames.map(async (genreName) => {
        const existingGenre = await prisma.genre.findFirst({
          where: {
            name: {
              equals: genreName,
              mode: "insensitive",
            },
          },
        });

        if (existingGenre) {
          return { id: existingGenre.id };
        } else {
          const newGenre = await prisma.genre.create({
            data: {
              name: genreName,
              description: `${genreName} genre movies`,
            },
          });
          return { id: newGenre.id };
        }
      })
    );

    // Process both directors and actors
    const actorsNames = parsedData.data.actors
      .split(",")
      .map((g) => g.trim())
      .filter((g) => g.length > 0);
    const directorsNames = parsedData.data.directors
      .split(",")
      .map((g) => g.trim())
      .filter((g) => g.length > 0);

    // First, disconnect all existing director actor
    await prisma.starring.deleteMany({
      where: {
        movieId: id,
      },
    });

    // Create connections for both directors and actors
    const starringConnections = await Promise.all([
      ...directorsNames.map(async (directorName) => {
        const existingPerson = await prisma.person.findFirst({
          where: {
            name: {
              equals: directorName,
              mode: "insensitive",
            },
          },
        });

        const personId = existingPerson
          ? existingPerson.id
          : (
              await prisma.person.create({
                data: {
                  name: directorName,
                  description: `Director`,
                },
              })
            ).id;

        return {
          role: Role.DIRECTOR,
          person: {
            connect: {
              id: personId,
            },
          },
        };
      }),
      ...actorsNames.map(async (actorName) => {
        const existingPerson = await prisma.person.findFirst({
          where: {
            name: {
              equals: actorName,
              mode: "insensitive",
            },
          },
        });

        const personId = existingPerson
          ? existingPerson.id
          : (
              await prisma.person.create({
                data: {
                  name: actorName,
                  description: `Actor`,
                },
              })
            ).id;

        return {
          role: Role.ACTOR,
          person: {
            connect: {
              id: personId,
            },
          },
        };
      }),
    ]);

    // Update movie with new data and reconnect genres
    const updatedMovie = await prisma.movie.update({
      where: {
        id: id,
      },
      data: {
        title: parsedData.data.title,
        description: parsedData.data.description,
        imageUrl: parsedData.data.imageurl,
        price: new Prisma.Decimal(updatedData.price.toString()),
        stock: parsedData.data.stock,
        releaseDate: parsedData.data.release,
        runtime: parsedData.data.runtime,
        genre: {
          connect: genreConnections,
        },
        starring: {
          create: starringConnections,
        },
      },
      include: {
        genre: true,
        starring: {
          include: {
            person: true,
          },
        },
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Movie updated successfully",
      data: {
        ...updatedMovie,
        price:
          updatedMovie.price instanceof Prisma.Decimal
            ? updatedMovie.price.toNumber()
            : Number(updatedMovie.price),
      },
    };
  } catch (error) {
    console.error("Error updating movie:", error);
    return {
      success: false,
      message: "Failed to update movie.",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
