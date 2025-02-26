import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";
import AddToCartButton from "@/components/shopping-cart/add-to-cart-button";
import { CUSTOMMOVIE } from "./landing-movies";

export default function DialogMovie({ movie }: { movie: CUSTOMMOVIE }) {
  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="max-h-[300] justify-center">
        {movie.imageUrl && (
          <Image
            src={movie.imageUrl}
            alt="Movie Cover is missing"
            height={700}
            width={700}
            className="w-full h-[250px] object-cover"
          />
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] h-400">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <div>
            <div key={movie.id}
              className="flex justify-start item-center">
              <div className="flex w-1/2">
                {movie.imageUrl && (
                  <Image
                    src={movie.imageUrl}
                    alt="Movie Cover"
                    height={300}
                    width={300}
                    className="mt-6 ml-4 mb-8"
                  />
                )}
              </div>
              <div className=" pt-4 w-1/2">
                <h1 className="text-3xl font-bold">
                  {movie.title} ({movie.releaseDate}){" "}
                  {/* Render Title (Released Year)*/}
                </h1>
                <div className="flex pt-4 ">
                  <div className=" w-2/5">Duration : {movie.runtime}min</div>
                  <div className=" w-3/5">
                    {movie.genre.flatMap((g) => g.name).join("-")}
                  </div>
                </div>
                <div className="flex justify-between ">
                  <div className="w-2/5 mt-4">price : {movie.price} SEK</div>
                  {/* below line will show the availability of movie*/}
                  {movie.stock > 0 ? (
                    <div className="w-3/5 flex justify-between">
                      <p className="mr-2 mt-4">In Stock</p>
                      <div className="mt-2">
                      <AddToCartButton movieId={movie.id}/>

                      </div>
                    </div>
                  ) : (
                    <p className="text-red-600 mt-4 justify-start font-bold text-xl">Out of stock</p>
                  )}{" "}
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
