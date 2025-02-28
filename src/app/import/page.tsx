"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import PopulateDbWTMDBButton from "@/components/tmdb/tmdb-import-button";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main>{session?.user.role === "ADMIN" && <PopulateDbWTMDBButton />}</main>
  );
}
