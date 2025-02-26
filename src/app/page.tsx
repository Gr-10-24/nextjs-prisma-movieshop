"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import AddMoviesButton from "@/components/tmdb/add-button";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // const cookieStore = await cookies();
  // const test = await cookieStore.get("test");
  // console.log(test);
  // const testing: string[] = ["a", "b", "c"];
  // if (test === undefined) {
  //   await cookieStore.set("test", testing.join(", "));
  // }
  // const cookieStore = await cookies();
  // const test = await fetchCookie();
  // const test2 = await setCookie("a, b, c");
  // if (test === undefined) {
  //   const testing: string[] = ["a", "b", "c"];
  //   cookieStore.set("test", testing.join(", "));
  // }
  //console.log(test);

  return (
    <main className="flex flex-col container mx-auto py-12 gap-2">
      <AddMoviesButton />
      {session && (
        <div className="flex justify-end mb-6">
          This is shown if you are logged in.
        </div>
      )}
      {session?.user.role === "ADMIN" && (
        <div className="flex justify-end mb-6">
          This is shown if you are logged in as Admin.
        </div>
      )}
      {session?.user.role === "CUSTOMER" && (
        <div className="flex justify-end mb-6">
          This is shown if you are logged in as Customer.
        </div>
      )}
    </main>
  );
}
