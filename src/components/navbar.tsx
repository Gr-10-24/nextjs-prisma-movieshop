"use client";

import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LoginDialog } from "./login-dialog";
import { SignupDialog } from "./signup-dialog";
import AddToCartButton from "./shopping-cart/add-to-cart-button";

export default function NavBar() {
  const session = authClient.useSession();
  const router = useRouter();

  return (
    <header className="bg-primary">
      <div className="flex justify-between py-4 container mx-auto">
        <div>
          <h1 className="text-primary-foreground text-2xl font-bold">
            Movieshop
          </h1>
        </div>
        {session.isPending ? (
          <div className="flex items-center">
            <p className="text-primary-foreground">Loading...</p>
          </div>
        ) : !session.data ? (
          <div className="flex gap-2 items-center">
            <LoginDialog />
            <SignupDialog />
          </div>
        ) : (
          <div className="flex item-center gap-2">
            <AddToCartButton movieId="cm6rrrsg200004xzkxsf53xg4" />
            <Button
              variant={"secondary"}
              onClick={() => authClient.signOut().then(router.refresh)}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
