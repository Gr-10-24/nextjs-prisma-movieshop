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
    <form action={action} className="flex flex-col gap-2">
      <h1 className="text-center">
        {data ? "Edit person" : "Add a new person"}
      </h1>
      <div className="flex container flex-col content-center justify-center mx-auto">
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

        <div className="flex flex-col container p-2">
          <div className="flex">
            <div className="flex my-auto container justify-end">
              <p>Name:</p>
            </div>
            <div className="flex min-w-52">
              <Input
                name="name"
                type="text"
                defaultValue={data ? data.name : ""}
                placeholder="Name Here"
                className="border-2 border-black rounded-md m-2"
              />
            </div>

            <div className="flex container">
              <p></p>
            </div>
          </div>
          <div className="flex justify-center">
            {state?.fieldErrors.name && (
              <p className="text-red-500">
                {state.fieldErrors.name.join(", ")}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col container p-2">
          <div className="flex">
            <div className="flex my-auto container justify-end">
              <p>Desc:</p>
            </div>
            <div className="flex min-w-52">
              <Input
                name="description"
                type="text"
                defaultValue={data ? data.description : ""}
                placeholder="email@provider.com"
                className="border-2 border-black rounded-md m-2"
              />
            </div>

            <div className="flex container">
              <p></p>
            </div>
          </div>
          <div className="flex justify-center">
            {state?.fieldErrors.description && (
              <p className="text-red-500">
                {state.fieldErrors.description.join(", ")}
              </p>
            )}
          </div>
        </div>

        <div className="flex content-center justify-center">
          <Button disabled={isPending} className="border-2 w-72">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}
