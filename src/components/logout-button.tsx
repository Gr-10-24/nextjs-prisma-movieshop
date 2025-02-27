"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

export default function LogoutButton() {
  //const session = authClient.useSession();
  //const router = useRouter();

  return (
    <Button
      variant={"default"}
      onClick={() => authClient.signOut().then(redirect("/"))}
    >
      Logout
    </Button>
  );
}
