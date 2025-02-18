import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CUSTOMMOVIE } from "./carousel-oldMovies";
import Image from "next/image";

export default function DialogMovie({ movie }: { movie: CUSTOMMOVIE }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {movie.imageUrl && (
          <Image
            src={movie.imageUrl}
            alt="Movie Cover"
            height={600}
            width={600}
          />
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] ">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <div>
            <div
              key={movie.id}
              className="flex justify-start"
            >
              <div>
                {movie.imageUrl && (
                  <Image
                    src={movie.imageUrl}
                    alt="Movie Cover"
                    height={1000}
                    width={1000}
                    className="mt-6 ml-4 mb-4"
                  />
                )}
              </div>
              <div className="pl-10 pt-4 ">
                <h1 className="text-3xl font-bold">
                  {movie.title} ({movie.releaseDate}){" "}
                  {/* Render Title (Released Year)*/}
                </h1>
                <div className="flex">
                  <div className="pr-4">Duration : {movie.runtime}min</div>
                  {movie.stock > 0 ? <p>In Stock</p> : <p>N/A</p>}{" "}
                  {/* This will show the availability of movie*/}
                  <span className="ml-6">
                    
                    {movie.genre.flatMap((g) => g.name).join("-")}
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-semibold">Description: </h2>
                <div className="mr-2">{movie.description}</div>

                {/* Render Stars in line on the browser*/}
                <div className="flex justify-stretch">
                  <div className="mt-4 mr-4 pr-6">
                    <h1 className="text-lg font-bold">Stars</h1>
                    <div>
                      {movie.starring
                      .filter((s) => s.role !== "DIRECTOR")
                      .flatMap((s) => s.person.map((p) => p.starName))
                      .join(", ")}
                      </div>
                  </div>

                  {/* Render Directors in line on the browser*/}
                  <div className="mt-4 pr-6">
                    <h1 className="text-lg font-bold">Directed by</h1>
                    {movie.starring
                      .filter((s) => s.role !== "ACTOR")
                      .flatMap((s) => s.person.map((p) => p.starName))
                      .join(", ")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
