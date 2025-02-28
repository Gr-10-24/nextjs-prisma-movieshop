"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import UserDash from "../user-dashboard/page";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main>
      {session?.user.role === "CUSTOMER" && <UserDash />}
      {session?.user.role === "ADMIN" && ""}
    </main>
  );

  // <div >
  //         <OrderStat order={order} />
  //       </div>
  //       <div className="flex w-200 h-100 mt-8 ml-8">
  //         <SalesGraph order={order} />
  //         <div className="ml-20">
  //           <ScrollAreaStock movie={movies} />
  //         </div>
  //       </div>
}
