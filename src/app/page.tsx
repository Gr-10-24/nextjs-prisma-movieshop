"use server";

import Welcome from "@/components/welcome/welcome";

// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";
// import UserDash from "./user-dashboard/page";
export default async function Page() {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  return (
    <main>
      {" "}
      {/*className="flex flex-col container mx-auto gap-2"*/}
      <Welcome />
      {/* {session?.user.role === "CUSTOMER" && (
        <UserDash/>
      )} */}
    </main>
  );
}
