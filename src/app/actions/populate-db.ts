"use server";

/*
  Use prisma client to populate the db from a remote resource
*/

import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client';
import { revalidatePath } from "next/cache";
import assert from 'node:assert';
import fs from 'node:fs';

type Top250Movie = {
  actor: { name: string }[],
  director: { name: string }[],
  genre: string[]
  name: string
  image: string
  datePublished: string
  duration: string
  description: string
  // Among other things...
}
type Movie = Prisma.MovieCreateInput
type MovieUnion = Movie & Top250Movie

export async function getMovieCount() {
  const movieCount = await prisma.movie.count()
  return movieCount
}

function parseMovie(movie: Top250Movie): Movie {
  return {
    title: movie.name,
    description: movie.description,
    stock: 5,
    genre: {
      connect: movie.genre.map(genre => {
        return { name: genre }
      })
    },
    // TODO
    // starring: {},
    imageUrl: movie.image,
    price: moviePrice(movie),
    releaseDate: dateStringToYear(movie.datePublished),
    runtime: parseRuntime(movie.duration)
  }
}

function dateStringToYear(s: string) {
  return new Date(s).getFullYear()
}
assert(dateStringToYear("1961-09-13") === 1961)

function moviePrice(movie: Top250Movie) {
  const year = dateStringToYear(movie.datePublished)
  if (year < 1980)
    return 79
  if (year < 2000)
    return 99
  if (year < 2010)
    return 149
  return 199
}

function parseRuntime(duration: string) {
  const match = duration.match(/PT((?<hours>\d+)H)?((?<minutes>\d+)M)?/)
  const hours = Number(match?.groups?.hours || 0)
  const minutes = Number(match?.groups?.minutes || 0)
  return String((hours * 60) + minutes)
}
assert(parseRuntime("PT1H50M") === "110")
assert(parseRuntime("PT3H") === "180")
assert(parseRuntime("PT45M") === "45")
assert(parseRuntime("PT2H4M") === "124")

// Insert missing genres
async function insertMissingGenres(movies: MovieUnion[]) {
  const allGenresSet = movies.reduce((genres, movie) => {
    // Set.union could have been used here, but since I have an older
    // node version this will have to do.
    movie.genre.map(genre => genres.add(genre))
    return genres
  }, new Set() as Set<string>)

  // Convert set to a array so map becomes available
  const allGenres = [...allGenresSet]

  const result = allGenres.map(genre =>
    prisma.genre.upsert({
      where: { name: genre },
      update: {}, // update is mandatory for prismas implementation of upsert
      create: { name: genre }
    }).catch(error => console.error('Error upserting genre:', error))
  );

  return await Promise.all(result)
}

// // Insert Movies
async function insertMovies(movies: Movie[]) {
  try {
    // createMany and connect many cannot be combined, so use create
    // instead.
    const result = movies.map(movie =>
      prisma.movie.create({
        data: {
          title: movie.name,
          description: movie.description,
          imageUrl: movie.image,
          price: moviePrice(movie),
          stock: 5,
          releaseDate: dateStringToYear(movie.datePublished),
          runtime: parseRuntime(movie.duration),
          genre: {
            connect: movie.genre.map(genre => {
              return { name: genre }
            })
          },
          // TODO: starring
          // starring: movie.director.concat(movie.actor),
        }
      }),
    )
    return await Promise.all(result)
  } catch (error) {
    console.error('Error inserting movie:', error)
  }
}

export async function populateDb() {
  const resource = "public/top250.json";
  const data = fs.readFileSync(resource, 'utf8');
  const movies = JSON.parse(data)

  const genres = await insertMissingGenres(movies)
  console.info("Upserted %s genres in total", genres.length)

  const movieResult = await insertMovies(movies)
  console.info("%s Movies inserted", movieResult?.length)

  console.info("All done")
  revalidatePath("/")
}

