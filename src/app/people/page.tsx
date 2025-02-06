// import SignUpForm from "@/components/signup-form";
import PeopleForm from "@/components/people/people-form";
import PeopleList from "@/components/people/people-list";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getPeople } from "../actions/people";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const people = await getPeople();
  
  return (
    <main className="flex flex-col container mx-auto py-12 gap-2">
      {session && (
        <div className="flex justify-end mb-6">
          This is shown if you are logged in.
        </div>
      )}
      {(session?.user.role === "ADMIN") && (
        <div>
            <PeopleForm />
        </div>
      )}
      {(session?.user.role === "USER") && (
        <div className="flex justify-end mb-6">
          This is shown if you are logged in as User.
        </div>
      )}
      {(session !== null)? <PeopleList people={people} userRole={session.user.role}/> : <PeopleList people={people} />}
    </main>
  );
}