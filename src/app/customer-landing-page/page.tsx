import { CarouselMovies } from "@/components/ui/customer/landing-movies";

export default function Page() {
  return (
    <div className="px-12 pb-8">
      <div className="text-2xl font-semibold justify-center mt-10">
        <h1>Oldest Movies</h1>
      </div>
      <div className="flex justify-start mt-2">
        <CarouselMovies sortBy="releaseDate" orderedBy="asc" limit={5} />
      </div>

      <div className="text-2xl font-semibold justify-center mt-8">
        <h1>Newest Movies</h1>
      </div>
      <div className="flex justify-start mt-2">
        <CarouselMovies sortBy="releaseDate" orderedBy="desc" limit={5} />
      </div>

      <div className="text-2xl font-semibold justify-center mt-8">
        <h1>Cheapest Movies</h1>
      </div>
      <div className="flex justify-start mt-2">
        <CarouselMovies sortBy="price" orderedBy="asc" limit={5} />
      </div>
    </div>
  );
}
