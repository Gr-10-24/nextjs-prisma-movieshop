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
import DialogMovie from "./dialog-movie";

export interface CUSTOMMOVIE {
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
  }[]
}

interface movieProps{
  sortBy : "releaseDate" | "price"
  orderedBy: "asc" | "desc"
  limit: number
  
  }

export function CarouselMovies({
  sortBy,orderedBy,limit}:movieProps
) {
  const [loading, setLoading] = React.useState(false);
  const [movie, setMovie] = React.useState<CUSTOMMOVIE[]>([]);

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

  const sortedMovies = movie.sort((a, b) => {
    const aValue = a[sortBy]
    const bValue = b[sortBy]
    return orderedBy === "asc"? aValue-bValue : bValue-aValue}).slice(0,limit);

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full h-max-240"
    >
      <CarouselContent>
        {sortedMovies.map((m) => (
          <CarouselItem key={m.id} className="md:basis-1/2 lg:basis-1/5 h-[420px]">
            <div className="p-1">
              <Card className="transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl ">
                <CardContent className="flex flex-col items-center justify-between h-full p-6">
                  {
                    <span className="text-sm justify-end">
                      {<DialogMovie movie={m} />}
                      <span className="flex justify-center">
                       { 
                          sortBy === "releaseDate"?<p>({m.releaseDate})</p>: <p>({m.price} kr )</p> 
                         } 
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
