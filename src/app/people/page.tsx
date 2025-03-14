import PeopleForm from "@/components/people/people-form";
import PeopleList from "@/components/people/people-list";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getPeopleWstarring } from "../actions/people";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const people = await getPeopleWstarring();

  return (
    <div className="flex">
      {session?.user.role === "ADMIN" && (
        <div className=" border  w-1/2 lg:w-1/3 py-6 ">
          <div className="flex container justify-center">
            <PeopleForm />
          </div>
        </div>
      )}

      <div
        className={
          session?.user.role === "ADMIN"
            ? "w-1/2 lg:w-3/4"
            : "flex flex-col mx-auto justify-center"
        }
      >
        <h1 className="text-2xl text-black p-7 text-center">People Lists</h1>
        {session !== null ? (
          <PeopleList people={people} userRole={session.user.role} />
        ) : (
          <PeopleList people={people} />
        )}
      </div>
    </div>
  );
}
