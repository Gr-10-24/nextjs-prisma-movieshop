"use client";
import { CUSTOMMOVIE } from "@/components/ui/customer/landing-movies";
import { useEffect, useState } from "react";
import FetchMovies from "../actions/customer-movie";
import { Input } from "@/components/ui/input";
import CarouselAllMovies from "@/components/ui/customer/carousel-customer-movies";

export default function TastMovies() {
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState<CUSTOMMOVIE[]>([]);
  const [search, setsearch] = useState("");

  {
    /* fetch movies from DB*/
  }
  useEffect(() => {
    const oldMovies = async () => {
      setLoading(true);
      try {
        const movieData = await FetchMovies();
        setMovie(movieData);
      } catch (error) {
        return error;
      } finally {
        setLoading(false);
      }
    };
    oldMovies();
  }, []);

  if (loading) return <p>Loading...</p>;

  // check whether the inputs in the search bar includes in the movie titles
  const filteredMovie = movie.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  // sort the filtered movies in the alphabetical order of title
  const alphMovies = filteredMovie.sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  const A_JMovies: CUSTOMMOVIE[] = []; // define arrays for store A-J filtered movies
  const K_TMovies: CUSTOMMOVIE[] = []; // define arrays for store K-T filtered movies
  const U_ZMovies: CUSTOMMOVIE[] = []; // define arrays for store U-Z filtered movies

  alphMovies.forEach((movie) => {
    const firstLetter = movie.title.charAt(0).toLocaleUpperCase();

    // group and push movies into above three arrays by checking the first letter of the movie title.
    if (firstLetter >= "A" && firstLetter <= "J") A_JMovies.push(movie);
    if (firstLetter >= "K" && firstLetter <= "T") K_TMovies.push(movie);
    if (firstLetter >= "U" && firstLetter <= "Z") U_ZMovies.push(movie);
  });

  return (
    <div>
      <div className="px-12 pt-12 mb-12 ">
        <h1 className="text-3xl font-bold justify-center mb-8">MOVIE LIBRARY</h1>
        <div className="flex items-center bp-4 ">
          {/* render a search bar on the browser. */}
          <Input
            placeholder="Search Movie Title..."
            value={search}
            onChange={(event) => setsearch(event.target.value)}
            className="max-w-lg bp-2"
          />
        </div>
        {/* Carousel for A-J movies */}
        <h1 className="mt-6">A-J movies</h1>
        <div>
          <CarouselAllMovies movies={A_JMovies} />
        </div>
        {/* Carousel for K-T movies */}
        <h1 className="mt-6">K-T movies</h1>
        <div>
          <CarouselAllMovies movies={K_TMovies} />
        </div>
        {/* Carousel for U-Z movies */}
        <h1 className="mt-6">U-Z movies</h1>
        <div>
          <CarouselAllMovies movies={U_ZMovies} />
        </div>
      </div>
    </div>
  );
}
