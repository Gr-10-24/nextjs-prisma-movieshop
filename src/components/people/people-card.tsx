"use client";

import { Person } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { PeopleDialog } from "./people-dialog";
import { Button } from "../ui/button";
import { deletePerson } from "@/app/actions/people";
import { PeopleDialogD } from "./people-dialog-d";


export default function PersonCard(data: { person: Person; role?: string }) {
  return (
    <div
      key={data.person.id}
      className="flex container border-2 border-black rounded-md mx-auto m-1 gap-2"
    >
      <div className="flex flex-col px-3">
        <p>Name: {data.person.name}</p>
        <p>Desc: {data.person.description.substring(0, 25)}</p>
      </div>
      <div className="flex my-auto">
        <PeopleDialogD data={data.person} />
      </div>
      {(data.role === "ADMIN") ? (
        <div>
          <div className="flex my-auto">
            <PeopleDialog data={data.person} />
          </div>
          <div className="flex my-auto">
            <Button
              variant={"destructive"}
              onClick={() => deletePerson(data.person.id)}
            >
              <Trash2 />
            </Button>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}