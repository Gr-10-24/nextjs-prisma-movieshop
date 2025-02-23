// "use client";

// import * as React from "react";

// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import FetchMovies from "@/app/actions/customer-movie";
// import DialogMovie from "./dialog-movie";
// import { CUSTOMMOVIE } from "./carousel-oldMovies";

// export function CarouselCheapestMovies() {
//   const [loading, setLoading] = React.useState(false);
//   const [movie, setMovie] = React.useState<CUSTOMMOVIE[]>([]);

//   {
//     /* fetch movies from DB*/
//   }
//   React.useEffect(() => {
//     const oldMovies = async () => {
//       setLoading(true);
//       try {
//         const movieData = await FetchMovies();
//         setMovie(movieData);
//       } catch (error) {
//         return error;
//       } finally {
//         setLoading(false);
//       }
//     };
//     oldMovies();
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   const sortedMovies = movie.sort((a, b) => a.price - b.price);
//   const cheapestMovies = sortedMovies.slice(0, 5); // Get most cheapest 5 movies

//   return (
//     <Carousel
//       opts={{
//         align: "start",
//       }}
//       className="w-full max-w-fit"
//     >
//       <CarouselContent>
//         {cheapestMovies.map((m) => (
//           <CarouselItem key={m.id} className="md:basis-1/2 lg:basis-1/5">
//             <div className="p-1">
//               <Card className="transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
//                 <CardContent className="flex aspect-square items-center justify-center p-6">
//                   {
//                     <span className="text-3xl font-semibold">
//                       {<DialogMovie movie={m} />}
//                     </span>
//                   }
//                 </CardContent>
//               </Card>
//             </div>
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>
//   );
// }
