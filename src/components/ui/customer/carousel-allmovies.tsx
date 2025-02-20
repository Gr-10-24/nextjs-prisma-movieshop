"use client";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CUSTOMMOVIE } from "./carousel-oldMovies";
import FetchMovies from "@/app/actions/customer-movie";
import DialogMovie from "./dialog-movie";
import { DotIcon } from "lucide-react";
import { Input } from "../input";
import AddToCartButton from "@/components/shopping-cart/add-to-cart-button";

export default function CarouselAllMovies() {
  const [loading, setLoading] = React.useState(false);
  const [movie, setMovie] = React.useState<CUSTOMMOVIE[]>([]);
  const [search, setsearch] = React.useState("");

  {
    /* fetch movies from DB*/
  }
  React.useEffect(() => {
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
    <>
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

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full h-max-240"
      >
        <h1 className="mt-6">A-J movies</h1>
        <CarouselContent>
          {filteredMovie.length > 0 ? (
            A_JMovies.map((movie) => (
              <CarouselItem
                key={movie.id}
                className="md:basis-1/2 lg:basis-1/5"
              >
                <div className="p-1">
                  <Card className="transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                    <CardContent className="flex aspect-square items-center p-6">
                      <span className="text-sm justify-end">
                        {<DialogMovie movie={movie} />}
                      </span>
                    </CardContent>
                    <div className="flex justify-between">
                      {/* below DotIcon will be green if stocks available and red if not. */}
                      {movie.stock > 0 ? (
                        <DotIcon className=" ml-2 mb-0 text-green-500 size-10" />
                      ) : (
                        <DotIcon className=" ml-2 mb-0 text-red-500 size-10" />
                      )}
                      {<AddToCartButton movieId={movie.id} />}
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))
          ) : (
            <div>no movies to show</div>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {/* Carousel for K-T movies */}
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full h-max-240"
      >
        <h1 className="mt-6">K-T movies</h1>
        <CarouselContent>
          {K_TMovies.map((movie) => (
            <CarouselItem key={movie.id} className="md:basis-1/2 lg:basis-1/5">
              <div className="p-1">
                <Card className="transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                  <CardContent className="flex aspect-square items-center  p-6">
                    <span className="text-sm justify-end">
                      {<DialogMovie movie={movie} />}
                    </span>
                  </CardContent>
                  <div className="flex justify-between">
                    {movie.stock > 0 ? (
                      <DotIcon className=" ml-2 mb-0 text-green-500 size-10" />
                    ) : (
                      <DotIcon className=" ml-2 mb-0 text-red-500 size-10" />
                    )}
                    {<AddToCartButton movieId={movie.id} />}
                  </div>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {/* Carousel for U-Z movies */}
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full h-max-240"
      >
        <h1 className="mt-6">U-Z movies</h1>
        <CarouselContent>
          {U_ZMovies.map((movie) => (
            <CarouselItem key={movie.id} className="md:basis-1/2 lg:basis-1/5">
              <div className="p-1">
                <Card className="transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-sm justify-end">
                      {<DialogMovie movie={movie} />}
                    </span>
                  </CardContent>
                  <div className="flex justify-between">
                    {movie.stock > 0 ? (
                      <DotIcon className=" ml-2 mb-0 text-green-500 size-10" />
                    ) : (
                      <DotIcon className=" ml-2 mb-0 text-red-500 size-10" />
                    )}
                    {<AddToCartButton movieId={movie.id} />}
                  </div>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}
