"use client";

import { Person } from "@prisma/client";

export default function PeopleCardD({ data }: { data: Person }) {
  return (
    <div
      key={data.id}
      className="flex container border-2 border-black rounded-md mx-auto m-1 gap-2"
    >
      <div className="flex flex-col px-3">
        <p>Name: {data.name}</p>
        <p>Desc: {data.description}</p>
      </div>
    </div>
  );
}