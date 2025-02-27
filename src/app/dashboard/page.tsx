"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import UserDash from "../user-dashboard/page";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return <main>{session?.user.role === "CUSTOMER" && <UserDash />}</main>;
}
