"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  //const session = authClient.useSession();
  const router = useRouter();

  return (
    <Button
      variant={"secondary"}
      onClick={() => authClient.signOut().then(router.refresh)}
    >
      Logout
    </Button>
  );
}
