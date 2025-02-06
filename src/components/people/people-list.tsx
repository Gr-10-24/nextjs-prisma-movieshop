"use client";

import { Person } from "@prisma/client";
import PersonCard from "./people-card";
//import { Session, User } from "better-auth";

// export default function PeopleList( data :  {people: Person[] , session?: {session: Session, user: User}} ) {
export default function PeopleList(data: {
  people: Person[];
  userRole?: string | null | undefined;
}) {
  return (
    <div className="Flex container gap-2 border-black border-2 m-2 p-2">
      {data.people.map((person) =>
        data.userRole ? (
          <PersonCard key={person.id} person={person} role={data.userRole} />
        ) : (
          <PersonCard key={person.id} person={person} />
        )
      )}
    </div>
  );
}

//(typeof data.userRole === "string")