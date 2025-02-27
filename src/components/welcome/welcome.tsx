import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronsDown, Clapperboard, FileStack } from "lucide-react";
import { CarouselMovies } from "../ui/customer/landing-movies";

export default function Welcome() {
  return (
    <>
      <div className="relative h-[600px]">
        <div className=" inset-0 -z-10 ">
          <Image
            src="/images/cover.png"
            alt="bg image"
            fill
            className="object-cover object-center transition-all duration-300 brightness-100 hover:brightness-50 hover:saturate-100 "
            quality={100}
          />
        </div>
        <div className="flex relative w-full justify-center items-center">
          <h1 className="text-5xl mt-40 pl-30 font-extrabold text-white font-serif drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            MOVIE BAZAAR
          </h1>
        </div>
        <div className="flex relative w-full justify-center items-center mt-20">
          <Link href="/customer-movies">
            <Button
              variant={"default"}
              className="text-xl border rounded-md py-4"
            >
              {" "}
              <FileStack /> BROWSE OUR ALL MOVIES
            </Button>
          </Link>
        </div>
        <div className="flex relative w-full justify-center items-center mt-10">
          <Link href="#movies">
            <ChevronsDown className="text-purple-700" size={"md"} />
          </Link>
        </div>
      </div>

      <div className="mt-8">
        {/*Rendering the specified movie lists */}

        <div className="px-12 pb-8" id="movies">
          {/*Rendering the most latest 5 movies list */}

          <div className="flex w-full text-2xl font-semibold justify-center mt-8 bg-purple-800 text-white border rounded-md py-2">
            <Clapperboard className="mt-1" />
            <h1 className="ml-4"> Brand-New Blockbusters</h1>
          </div>
          <div className="flex justify-start mt-2">
            <CarouselMovies sortBy="releaseDate" orderedBy="desc" limit={5} />
          </div>

          {/*Rendering the most oldest 5 movies list */}

          <div className="flex w-full text-2xl font-semibold justify-center mt-2 bg-purple-800 text-white border rounded-md py-2">
            <Clapperboard className="mt-1" />
            <h1 className="ml-4"> Legends of the Past</h1>
          </div>
          <div className="flex justify-start mt-2">
            <CarouselMovies sortBy="releaseDate" orderedBy="asc" limit={5} />
          </div>

          {/*Rendering the most cheapest 5 movies list */}

          <div className="flex w-full text-2xl font-semibold justify-center mt-2 bg-purple-800 text-white border rounded-md py-2">
            <Clapperboard className="mt-1" />
            <h1 className="ml-4"> Blockbusters on a Budget</h1>
          </div>
          <div className="flex justify-start mt-2">
            <CarouselMovies sortBy="price" orderedBy="asc" limit={5} />
          </div>
        </div>
      </div>
    </>
  );
}
