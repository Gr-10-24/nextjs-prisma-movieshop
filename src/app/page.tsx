"use server"

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import PopulateDBToast from "@/app/movie/populate-db-toast";
import { Toaster } from "@/components/ui/toaster";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="flex flex-col container mx-auto py-12 gap-2">

      <PopulateDBToast />

      {session && (
        <div className="flex justify-end mb-6">
          This is shown if you are logged in.
        </div>
      )}
      {(session?.user.role === "ADMIN") && (
        <div className="flex justify-end mb-6">
          This is shown if you are logged in as Admin.
        </div>
      )}
      {(session?.user.role === "USER") && (
        <div className="flex justify-end mb-6">
          This is shown if you are logged in as User.
        </div>
      )}
      <Toaster />
    </main>
  );
}