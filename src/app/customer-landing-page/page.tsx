import { CarouselCheapestMovies } from "@/components/ui/customer/carousel-cheapest";
import { CarouselNewMovies } from "@/components/ui/customer/carousel-newest";
import { CarouselOldMovies } from "@/components/ui/customer/carousel-oldMovies";

export default function Page() {
  return (
    <div>
      <div className="text-2xl font-semibold justify-center mt-10">
        <h1>Oldest Movies</h1>
      </div>
      <div className="flex justify-start mt-2">
        <CarouselOldMovies />
      </div>

      <div className="text-2xl font-semibold justify-center mt-8">
        <h1>Newest Movies</h1>
      </div>
      <div className="flex justify-start mt-2">
        <CarouselNewMovies />
      </div>

      <div className="text-2xl font-semibold justify-center mt-8">
        <h1>Cheapest Movies</h1>
      </div>
      <div className="flex justify-start mt-2">
        <CarouselCheapestMovies />
      </div>
    </div>
  );
}
