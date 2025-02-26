"use server";

// type genre = {
//   id: number;
//   name: string;
// };

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

//import axios from "axios";
// import { useEffect, useState } from "react";

// async function api<T>(path: string): Promise<T> {
//   const response = await fetch(path);

//   if (!response.ok) {
//     throw new Error(response.statusText);
//   }

//   //    And can also be used here ↴
//   return (await response.json()) as T;
// }

// async function getMovies(url: string) {
//   //             Passed to T ↴
//   return await api<{ movies: dBMovie[] }>(url);
// }

// export async function PopulateDbWTmdb() {
//   // const Populate = () => {
//   //   const [movies, setMovies] = useState([]);
//   //   useEffect(() => {
//   //     getMovies();
//   //   }, [movies, setMovies]);
//   //   const getMovies = async () => {
//   //     const response = await fetch(
//   //       `https://api.themoviedb.org/3/discover/movie?api_key=9d93513a5360eeddedf357629119d2ab`
//   //     );
//   //     const data = await response.json();
//   //     setMovies(data.results); // `results` from the tmdb docs
//   //     console.log(data);
//   //   };
//   //   return movies;
//   // };
//   // const test = Populate();
//   // console.log(test);
//   // const url =
//   //   "https://api.themoviedb.org/3/discover/movie?api_key=9d93513a5360eeddedf357629119d2ab&append_to_response=credits";
//   // try {
//   //   const response = await fetch(url);
//   //   if (!response.ok) {
//   //     throw new Error(`Response status: ${response.status}`);
//   //   }
//   //   const json = await response.json();
//   //const movieArr = JSON.parse(json);
//   // const arr: dBMovie[] = movieArr.map((movie) => {
//   //   console.log(movie);
//   // });
//   //console.log(json);
//   //json.map((movie) => console.log(movie));
//   //console.log(json.length);
//   // } catch (e) {
//   //   throw e;
//   // }
//   //const movies = await getMovies(url);
//   //console.log(movies);
//   // const test: TestingType = await testing();
//   // console.log(test);
// }

export async function testing() {
  //: Promise<dBMovie[]>
  const max = 10;
  const movieIds: number[] = [];

  // const url =
  //   "https://api.themoviedb.org/3/discover/movie?api_key=9d93513a5360eeddedf357629119d2ab&page=";
  // const url2 =
  //   "https://api.themoviedb.org/3/discover/movie?api_key=9d93513a5360eeddedf357629119d2ab&include_adult=false&include_video=false&language=en-US&page=1&sort_by=title.asc&append_to_response=credits,genres";
  try {
    // const response = await fetch(url);
    // if (!response.ok) {
    //   throw new Error(`Response status: ${response.status}`);
    // }
    // const json = await response.json();

    //console.log(json);
    // const url =
    //   "https://api.themoviedb.org/3/discover/movie?api_key=9d93513a5360eeddedf357629119d2ab&page=";
    // for (let i = 1; i < max; i++) {
    //   const response = await fetch(
    //     `https://api.themoviedb.org/3/discover/movie?api_key=9d93513a5360eeddedf357629119d2ab&page=${i}`
    //   );
    //   console.log("test1");
    //   if (!response.ok) {
    //     throw new Error(`Response status: ${response.status}`);
    //   }
    //   const json = await response.json();
    //   json.results.map((movie: dBMovie) => movieIds.push(movie.id));
    // }

    //console.log(movieIds);

    const url =
      "https://api.themoviedb.org/3/movie/950396?api_key=9d93513a5360eeddedf357629119d2ab&include_adult=false&include_video=false&language=en-US&page=1&sort_by=title.asc&append_to_response=credits,genres";

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
    json.results.map((movie: dbMovies) => console.log(movie.id));

    //json.results.map((movie: dBMovie) => console.log(movie.id)); //this is the way
  } catch (e) {
    throw e;
  }
}

// export type TestingType = Awaited<ReturnType<typeof testing>>;

// export async function convertApi(arr: dBMovie[]): Promise<
//   {
//     genre_ids: number[];
//     title: string;
//     overview: string;
//     poster_path: string;
//     release_date: string;
//   }[]
// > {
//   arr.forEach((movie) => console.log(movie));
//   return arr;
// }
