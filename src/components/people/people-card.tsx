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
      className="flex border-2 border-black rounded-md mx-auto p-2 m-1 gap-2 justify-between max-w-[600px]"
    >
      <div className="flex flex-col px-3">
        <div className="flex flex-col px-3">
          <p>Name: {data.person.name}</p>
        </div>
        <div className="flex flex-col px-3">
          <p>Desc: </p>
          <textarea
            readOnly={true}
            className="border-black rounded-md"
            name="desc"
            defaultValue={
              data.person?.description
                ? data.person.description.length > 50
                  ? `${data.person.description.slice(0, 50)}...`
                  : data.person.description
                : ""
            }
          ></textarea>
        </div>
      </div>
      <div className="flex my-auto">
        <div className="flex my-auto">
          <PeopleDialogD data={data.person} />
        </div>
        {data.role === "ADMIN" ? (
          <div className="flex my-auto">
            <PeopleDialog data={data.person} />
          </div>
        ) : (
          <p></p>
        )}
        {data.role === "ADMIN" ? (
          <div className="flex my-auto">
            <Button
              variant={"destructive"}
              onClick={() => deletePerson(data.person.id)}
            >
              <Trash2 />
            </Button>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
