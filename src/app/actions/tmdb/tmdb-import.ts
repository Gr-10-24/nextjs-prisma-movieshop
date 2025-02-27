"use server";

import { prisma } from "@/lib/prisma";
import { addStarringQimport } from "../starring";

interface dbMovie {
  id: number;
  genre_ids: number[];
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

export interface dbMovies {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: number | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: Credits;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Credits {
  cast: Cast[];
  crew: Crew[];
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface Crew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  credit_id: string;
  department: string;
  job: string;
}

export async function importTMDB() {
  const max = 500;
  const movieIds: number[] = [];

  try {
    for (let i = 1; i < max; i++) {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=9d93513a5360eeddedf357629119d2ab&page=${i}`
      );
      if (!response.ok) {
        console.log(`error in adding movie to list: ${i}`);
      } else {
        const json = await response.json();
        json.results.map((movie: dbMovie) => movieIds.push(movie.id));
      }
    }

    for (let i = 0; i < movieIds.length; i++) {
      const url = `https://api.themoviedb.org/3/movie/${movieIds[i]}?api_key=9d93513a5360eeddedf357629119d2ab&include_adult=false&include_video=false&language=en-US&page=1&sort_by=title.asc&append_to_response=credits,genres`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json: dbMovies = await response.json();

      const check = await prisma.movie.findFirst({
        where: {
          title: json.title,
          releaseDate: dateStringToYear(json.release_date),
        },
      });

      if (check === null) {
        const aMovie = await prisma.movie.create({
          data: {
            title: json.title,
            description: json.overview,
            imageUrl:
              "https://image.tmdb.org/t/p/w600_and_h900_bestv2" +
              json.poster_path,
            price: moviePrice(json.release_date),
            stock: 15,
            releaseDate: dateStringToYear(json.release_date),
            runtime: json.runtime.toString(),
          },
        });
        for (let j = 0; j < json.genres.length; j++) {
          await prisma.genre.upsert({
            where: { name: json.genres[j].name },
            update: {
              movies: {
                connect: { id: aMovie.id },
              },
            },
            create: {
              name: json.genres[j].name,
              movies: {
                connect: { id: aMovie.id },
              },
            },
          });
        }
        for (
          let k = 0;
          json.credits.cast.length < 5 ? k < json.credits.cast.length : k < 5;
          k++
        ) {
          await addStarringQimport(
            aMovie.id,
            json.credits.cast[k].name,
            "ACTOR"
          );
        }
        json.credits.crew.map(async (person) => {
          if (person.job === "Director") {
            await addStarringQimport(aMovie.id, person.name, "DIRECTOR");
          }
        });
      }
    }
  } catch (e) {
    throw e;
  }
}

function moviePrice(date: string) {
  const year = new Date(date).getFullYear();
  if (year < 1980) return 79;
  if (year < 2000) return 99;
  if (year < 2010) return 149;
  return 199;
}

function dateStringToYear(s: string) {
  if (s === "") {
    return 0;
  } else {
    return new Date(s).getFullYear();
  }
}
