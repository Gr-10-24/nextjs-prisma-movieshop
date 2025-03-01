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

import DialogMovie from "./dialog-movie";
import { CUSTOMMOVIE } from "./landing-movies";
import FetchMovies from "@/app/actions/customer-movie";

interface CountProps {
  movieId: string;
  _count: {
    movieId: number;
  };
}

export function CarouselTopPurchased({
  purchasedMovie,
}: {
  purchasedMovie: CountProps[];
}) {

    const [loading,setLoading] = React.useState(false)
    const [movies,setMovies] = React.useState<CUSTOMMOVIE[]>([])

  const sortedMovies = purchasedMovie.sort(
    (a, b) => b._count.movieId - a._count.movieId
  ).slice(0,5).map((m)=>m.movieId);

  React.useEffect(() => {
      const movies = async () => {
        setLoading(true);
        try {
          const movieData = await FetchMovies();
          const selectedMovies: CUSTOMMOVIE[] = movieData.filter((movie)=>sortedMovies.includes(movie.id))
          setMovies(selectedMovies);
        } catch (error) {
          return error;
        } finally {
          setLoading(false);
        }
      };
      movies();
    }, [sortedMovies]);

    if (loading) return <p>Loading...</p>;

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full h-max-240"
    >
      <CarouselContent>
        {movies.map((m) => (
          <CarouselItem
            key={m.id}
            className="md:basis-1/2 lg:basis-1/5 h-[420px]"
          >
            <div className="p-1">
              <Card className="transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl ">
                <CardContent className="flex flex-col items-center justify-between h-full p-6">
                  {
                    <span className="text-sm justify-end">
                      {<DialogMovie movie={m}/>}
                    </span>
                  }
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
