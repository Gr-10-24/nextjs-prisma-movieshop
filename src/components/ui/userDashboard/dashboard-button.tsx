"use client";

import { redirect } from "next/navigation";
import { Button } from "../button";

export default function DashboardButton() {
  //const session = authClient.useSession();
  //const router = useRouter();

  return (
    <Button variant={"default"} onClick={() => redirect("/dashboard")}>
      Dashboard
    </Button>
  );
}
