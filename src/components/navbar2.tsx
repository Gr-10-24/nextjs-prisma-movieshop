import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { LoginDialog } from "./login-dialog";
import { SignupDialog } from "./signup-dialog";
import { CartDialog } from "./shopping-cart/cart-dialog";
import { getOrCreateCart } from "@/app/actions/cart";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function NavBar2() {
  //const session = authClient.useSession();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const cart = await getOrCreateCart();

  return (
    <header className="bg-primary">
      <div className="flex justify-between py-4 container mx-auto">
        <div>
          <h1 className="text-primary-foreground text-2xl font-bold">
            Movieshop
          </h1>
        </div>
        {session === null ? (
          <div className="flex gap-2 items-center">
            <LoginDialog />
            <SignupDialog />
          </div>
        ) : (
          <div className="flex item-center gap-2">
            <CartDialog cart={cart} />
            <Button variant={"secondary"} onClick={() => authClient.signOut()}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
