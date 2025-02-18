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
import { $Enums } from "@prisma/client";
import FetchMovies from "@/app/actions/customer-movie";
import Image from "next/image";

export interface OLDMOVIE {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  price: number;
  stock: number;
  releaseDate: number;
  runtime: string;
  genre: {
    id: string;
    name: string;
  }[];
  starring: {
    id: string;
    role: $Enums.Role;
    person: {
      id: string;
      starName: string;
    }[];
  }[];
}

export function CarouselOldMovies() {
  const [loading, setLoading] = React.useState(false);
  const [movie, setMovie] = React.useState<OLDMOVIE[]>([]);

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

  const sortedMovies = movie.sort((a, b) => a.releaseDate - b.releaseDate);
  const oldestMovies = sortedMovies.slice(0, 5); // Get most oldest 5 movies

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-fit"
    >
      <CarouselContent>
        {oldestMovies.map((m) => (
          <CarouselItem key={m.id} className="md:basis-1/2 lg:basis-1/5">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  {
                    <span className="text-lg">
                      {m.imageUrl && (
                        <Image
                          src={m.imageUrl}
                          alt="Movie Cover"
                          height={600}
                          width={600}
                          className=""
                        />
                      )}
                      <span className="flex justify-center">
                        ({m.releaseDate})
                      </span>
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
