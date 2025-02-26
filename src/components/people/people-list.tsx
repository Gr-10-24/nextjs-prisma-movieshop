"use client";

import PersonCard from "./people-card";
import { Peep } from "@/types/people";
//import { Session, User } from "better-auth";

// export default function PeopleList( data :  {people: Person[] , session?: {session: Session, user: User}} ) {
export default function PeopleList(data: {
  people: Peep[];
  userRole?: string | null | undefined;
}) {
  return (
    <div className="Flex gap-2 m-2 p-2">
      <h1 className="text-2xl text-black p-3 text-center pb-4">People details</h1>
      {data.people.map((person) =>
        data.userRole ? (
          person !== null ? (
            <PersonCard key={person.id} person={person} role={data.userRole} />
          ) : (
            "person is null"
          )
        ) : person !== null ? (
          <PersonCard key={person.id} person={person} />
        ) : (
          "person is null"
        )
      )}
    </div>
  );
}

//(typeof data.userRole === "string")
