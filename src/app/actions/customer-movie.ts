"use server";

import { prisma } from "@/lib/prisma";

export default async function FetchMovies() {
  const movies = await prisma.movie.findMany({
    // orderBy: {
    //   releaseDate: "asc",
    // },
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
          id: true,
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
  });
  return movies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    description: movie.description,
    imageUrl: movie.imageUrl,
    price: movie.price.toNumber(), // Convert price to number
    stock: movie.stock,
    releaseDate: movie.releaseDate,
    runtime: movie.runtime,
    genre: movie.genre.map((genre) => ({
      id: genre.id,
      name: genre.name,
    })),

    starring: movie.starring.map((star) => ({
      id: star.id,
      role: star.role,
      person: [
        {
          id: star.person.id,
          starName: star.person.name,
        },
      ],
    })),
  }));
}
