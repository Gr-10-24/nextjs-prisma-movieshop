"use server";

interface dBMovie {
  genre_ids: number[];
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

//import axios from "axios";
// import { useEffect, useState } from "react";

async function api<T>(path: string): Promise<T> {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  //    And can also be used here ↴
  return (await response.json()) as T;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getMovies(url: string) {
  //             Passed to T ↴
  return await api<{ movies: dBMovie[] }>(url);
}

export async function PopulateDbWTmdb() {
  // const Populate = () => {
  //   const [movies, setMovies] = useState([]);

  //   useEffect(() => {
  //     getMovies();
  //   }, [movies, setMovies]);

  //   const getMovies = async () => {
  //     const response = await fetch(
  //       `https://api.themoviedb.org/3/discover/movie?api_key=9d93513a5360eeddedf357629119d2ab`
  //     );
  //     const data = await response.json();
  //     setMovies(data.results); // `results` from the tmdb docs
  //     console.log(data);
  //   };

  //   return movies;
  // };

  // const test = Populate();
  // console.log(test);

  // const url =
  //   "https://api.themoviedb.org/3/discover/movie?api_key=9d93513a5360eeddedf357629119d2ab&append_to_response=credits";
  // try {
  //   const response = await fetch(url);
  //   if (!response.ok) {
  //     throw new Error(`Response status: ${response.status}`);
  //   }
  //   const json = await response.json();

  //const movieArr = JSON.parse(json);
  // const arr: dBMovie[] = movieArr.map((movie) => {
  //   console.log(movie);
  // });
  //console.log(json);
  //json.map((movie) => console.log(movie));
  //console.log(json.length);
  // } catch (e) {
  //   throw e;
  // }

  //const movies = await getMovies(url);
  //console.log(movies);

  const test: TestingType = await testing();
  console.log(test);
}

export async function testing(): Promise<dBMovie[]> {
  const url =
    "https://api.themoviedb.org/3/discover/movie?api_key=9d93513a5360eeddedf357629119d2ab&append_to_response=credits";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (e) {
    throw e;
  }
}

export type TestingType = Awaited<ReturnType<typeof testing>>;
