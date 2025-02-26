"use client";

import { useEffect, useState } from "react";

interface dbMovie {
  genre_ids: number[];
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

export default function App() {
  const [movies, setMovies] = useState<dbMovie[]>([]);

  const url =
    "https://api.themoviedb.org/3/discover/movie?api_key=9d93513a5360eeddedf357629119d2ab&append_to_response=credits";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    setMovies(json);
  };

  console.log(movies);
}
