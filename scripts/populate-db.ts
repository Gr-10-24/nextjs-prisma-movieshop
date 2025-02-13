#!/usr/bin/node

/*
  Use prisma client to populate the db from a remote resource
*/

const { PrismaClient } = require('@prisma/client');
const assert = require('node:assert');
const fs = require('node:fs');

const prisma = new PrismaClient();

function dateStringToYear(s) {
  return new Date(s).getFullYear()
}
assert(dateStringToYear("1961-09-13") === 1961)

function moviePrice(movie) {
  const year = dateStringToYear(movie.datePublished)
  if (year < 1980)
    return 79
  if (year < 2000)
    return 99
  if (year < 2010)
    return 149
  else
    return 199
}
assert(moviePrice({ datePublished: "1961-09-13"}) === 79)

function parseRuntime(duration) {
  const match = duration.match(/PT((?<hours>\d+)H)?((?<minutes>\d+)M)?/)
  const hours = Number(match.groups.hours || 0)
  const minutes = Number(match.groups.minutes || 0)
  return String((hours * 60) + minutes)
}
assert(parseRuntime("PT1H50M") === "110")
assert(parseRuntime("PT3H") === "180")
assert(parseRuntime("PT45M") === "45")
assert(parseRuntime("PT2H4M") === "124")

// Insert missing genres
async function insertMissingGenres(movies) {
  const allGenresSet = movies.reduce((genres, movie) => {
    // Set.union could be used here, but since I have an older node
    // version this will have to do.
    movie.genre.map(genre => genres.add(genre))
    return genres
  }, new Set())

  // Convert set to a array so map becomes available
  const allGenres = [...allGenresSet]

  const result = allGenres.map(genre =>
    prisma.genre.upsert({
      where: { name: genre },
      update: {}, // Empty update is necessary for prisma limitations
      create: { name: genre }
    }).catch(error => console.error('Error upserting genre:', error))
  );

  return await Promise.all(result)
}

// // Insert Movies
async function insertMovies(movies) {
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

async function fetchJSON(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function populateDb() {
  // const data = fs.readFileSync("scripts/top250.json", 'utf8');
  // const movies = JSON.parse(data)
  const movies = await fetchJSON(process.argv[2])

  console.log("Using resource: ", process.argv[2])

  const genres = await insertMissingGenres(movies)
  console.log("Upserted %s genres in total", genres.length)

  const movieResult = await insertMovies(movies)
  console.log("%s Movies inserted", movieResult.length)

  console.log("All done")
  process.exit(0)
}

if (!process.argv[2]) {
  console.log("Please provide a resource to fetch data from")
  process.exit(1)
}
populateDb()
