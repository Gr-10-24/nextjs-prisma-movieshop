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
    <main className="flex flex-col container mx-auto py-12 gap-2">
      {session?.user.role === "ADMIN" && (
        <div>
          <PeopleForm />
        </div>
      )}
      {session !== null ? (
        <PeopleList people={people} userRole={session.user.role} />
      ) : (
        <PeopleList people={people} />
      )}
    </main>
  );
}
