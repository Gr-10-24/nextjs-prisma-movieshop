"use client";

import PersonCard from "./people-card";
import { Peep } from "@/types/people";
//import { Session, User } from "better-auth";

// export default function PeopleList( data :  {people: Person[] , session?: {session: Session, user: User}} ) {
export default function PeopleList(data: {
  people: Peep[];
  userRole?: string | null | undefined;
}) {
  const arr: Peep[][] = [];
  for (let i = 0; i < data.people.length; i += 3) {
    if (i >= data.people.length - 3) {
      arr.push(data.people.slice(i));
    } else {
      arr.push(data.people.slice(i, i + 3));
    }
  }
  return (
    <div className="Flex gap-2 m-2 p-2">
      {arr.map((people: Peep[]) => (
        <div
          key={Math.random().toString() + "aaaaa" + Math.random().toString()}
          className="flex flex-row"
        >
          {people.map((person) =>
            data.userRole ? (
              person !== null ? (
                <PersonCard
                  key={person.id}
                  person={person}
                  role={data.userRole}
                />
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
      ))}
    </div>
  );
}

//(typeof data.userRole === "string")
