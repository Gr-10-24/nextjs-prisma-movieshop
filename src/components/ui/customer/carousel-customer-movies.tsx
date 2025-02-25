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
import { DotIcon } from "lucide-react";
import AddToCartButton from "@/components/shopping-cart/add-to-cart-button";
import { CUSTOMMOVIE } from "./landing-movies";

interface ALLMOVIECARPROP {
  movies: CUSTOMMOVIE[];
}

export default function CarouselAllMovies({ movies }: ALLMOVIECARPROP) {
  return (
    <>
      {/* Carousel for A-J movies */}

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full h-max-240"
      >
        <CarouselContent>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <CarouselItem
                key={movie.id}
                className="md:basis-1/2 lg:basis-1/5"
              >
                <div className="p-1">
                  <Card className="transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-sm justify-end">
                        {<DialogMovie movie={movie} />}
                      </span>
                    </CardContent>
                    <div className="flex justify-between pr-4">
                      {/* below DotIcon will be green if stocks available and red if not. */}
                      {movie.stock > 0 ? (
                        <div className="flex justify-between w-full">
                          <DotIcon className="mb-2 text-green-500 size-10 w-1/2" />
                          <div className="w-1/2">
                            {<AddToCartButton movieId={movie.id} />}
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between w-full">
                          <DotIcon className=" mb-2 text-red-500 size-10 w-1/2" />
                          <div className=" mt-1 text-red-600 font-bold text-xl">
                            Out of stock
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))
          ) : (
            <div className="p-4 text-red-600">no movies to show</div>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}
