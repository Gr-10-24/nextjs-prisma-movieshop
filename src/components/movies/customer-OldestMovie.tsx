"use client";

import FetchMovies from "@/app/actions/customer-movie";
import { $Enums } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";

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

export interface GENRES {
  name: string;
}

export default function TopOldMovies() {
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState<OLDMOVIE[]>([]);

  {
    /* fetch movies from DB*/
  }
  useEffect(() => {
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

  const oldestMovies = movie.slice(0, 3); // Get most oldest 5 movies
  console.log(oldestMovies);

  return (
    <div>
      {oldestMovies.map((m) => (
        <div
          key={m.id}
          className="flex justify-start border  border-black rounded-md mb-8"
        >
          <div>
            {m.imageUrl && (
              <Image
                src={m.imageUrl}
                alt="Movie Cover"
                height={500}
                width={500}
                className="mt-6 ml-4 mb-4"
              />
            )}
          </div>
          <div className="pl-10 pt-4 ">
            <h1 className="text-3xl font-bold">
              {m.title} ({m.releaseDate}) {/* Render Title (Released Year)*/}
            </h1>
            <div className="flex">
              <div className="pr-4">Duration : {m.runtime}min</div>
              {m.stock > 0 ? <p>In Stock</p> : <p>N/A</p>}{" "}
              {/* This will show the availability of movie*/}
            </div>
            <h2 className="mt-4 text-xl font-semibold">Description: </h2>
            <div className="mr-2">{m.description}</div>

            {/* Render Directors and Stars*/}

            { m.starring.map((s) =>
              s.role === "DIRECTOR" ? (
                  
                  <div key={s.id}>
                  {s.person.map((p) => (
                      <div key={p.id}>Directed by: {p.starName}</div>
                    ))}
                </div>
              ) : (
                  <div key={s.id}>
                  {s.person.map((p) => (
                      <div key={p.id}>
                      <h3 className="text-lg font-">Stars</h3>
                      <div key={p.id}>{p.starName}</div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
