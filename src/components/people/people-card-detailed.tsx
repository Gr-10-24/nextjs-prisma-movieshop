"use client";

import { Peep } from "@/types/people";

export default function PeopleCardD({ data }: { data: Peep }) {
  return (
    <div>
      {data !== null ? (
        <div
          key={data.id}
          className="flex container border-2 border-black rounded-md mx-auto m-1 gap-2"
        >
          <div className="flex flex-col px-3">
            <p>Name: {data.name}</p>
            <p>Desc: {data.description}</p>
            <div>
              <p>Directed: </p>
              {data.movies.map((movie) =>
                movie.role === "DIRECTOR" ? (
                  <p key={movie.id}>{movie.movie.title}</p>
                ) : (
                  ""
                )
              )}
            </div>
            <div>
              <p>Acted in: </p>
              {data.movies.map((movie) =>
                movie.role === "ACTOR" ? (
                  <p key={movie.id}>{movie.movie.title}</p>
                ) : (
                  ""
                )
              )}
            </div>
          </div>
        </div>
      ) : (
        "missing data"
      )}
    </div>
  );
}
