"use client";

import { CreatePerson, UpdatePerson } from "@/app/actions/people";
import { Person } from "@prisma/client";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useActionState } from "react";

export default function PeopleForm({ data }: { data?: Person }) {
  const [state, action, isPending] = useActionState(
    !data ? CreatePerson : UpdatePerson,
    null
  );

  return (
    <form action={action} className="max-w-lg mx-auto pl-10 bg-white rounded-lg">
    <h1 className="text-2xl text-black p-7 text-center">
      {data ? "Edit person" : "Add a new person"}
    </h1>
    <div className=" content-center justify-center pl-8">
      {data ? (
        <div className="flex flex-col container p-2">
          <div className="flex">
            <div className="flex my-auto container justify-end">
              <p>ID:</p>
            </div>
            <div className="flex min-w-64">
              <Input
                name="id"
                type="text"
                value={data.id}
                readOnly={true}
                className="border-2 border-black rounded-md m-2"
              />
            </div>

            <div className="flex container">
              <p></p>
            </div>
          </div>
        </div>
      ) : (
        <p></p>
      )}

      <div className="mb-4">
          <label htmlFor="name" className="block text-black text-lg">Name</label>
          
            <Input
              name="name"
              type="text"
              defaultValue={data ? data.name : ""}
              placeholder="Name Here"
              className=" border-black rounded-md shadow-sm p-2 mt-3"
            />
          

          <div className="flex container">
            <p></p>
          </div>
        <div className="flex justify-center">
          {state?.fieldErrors.name && (
            <p className="text-red-500">
              {state.fieldErrors.name.join(", ")}
            </p>
          )}
        </div>
      </div>

      <div className="mb-4">
          <label htmlFor="description" className="block text-black text-lg">Description</label>
          <textarea
            name="description"
            id="description"
            //type="text"
            defaultValue={data?.description ? data.description : ""}
            placeholder="Enter a description"
            className="w-full border border-black rounded-md shadow-sm p-2 h-24"
          />

          <div className="flex container">
            <p></p>
          </div>
      
        <div className="flex justify-center">
          {state?.fieldErrors.description && (
            <p className="text-red-500">
              {state.fieldErrors.description.join(", ")}
            </p>
          )}
        </div>
      </div>

      <div className="">
        <Button disabled={isPending} className="text-left bg-black text-white py-2 px-4 rounded-md hover:bg-black transition">
          Submit
        </Button>
      </div>
    </div>
  </form>
);
}
