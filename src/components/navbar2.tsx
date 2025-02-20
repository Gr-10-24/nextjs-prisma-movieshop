// import { Button } from "./ui/button";
// import { authClient } from "@/lib/auth-client";
import { LoginDialog } from "./login-dialog";
import { SignupDialog } from "./signup-dialog";
import { CartDialog } from "./shopping-cart/cart-dialog";
import { getCartFront } from "@/app/actions/cart";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import LogoutButton from "./logout-button";
import { ShoppingBasket } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default async function NavBar2() {
  //const session = authClient.useSession();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  //const cart = await getOrCreateCart();
  const cart = await getCartFront();

  return (
    <header className="bg-primary">
      <div className="flex justify-between py-4 container mx-auto">
        <div>
          <Link href="/">
            <h1 className="text-2xl font-bold text-primary-foreground">
              Movie Shop
            </h1>
          </Link>
        </div>

        {session === null ? (
          <div className="flex gap-2 items-center">
            {cart === undefined ? (
              <Button variant={"secondary"}>
                <ShoppingBasket />
              </Button>
            ) : (
              <CartDialog cart={cart} />
            )}
            <LoginDialog />
            <SignupDialog />
          </div>
        ) : (
          <div className="flex item-center gap-2">
            {cart === undefined ? (
              <Button variant={"secondary"}>
                <ShoppingBasket />
              </Button>
            ) : (
              <CartDialog cart={cart} />
            )}

            {/* <Button variant={"secondary"} onClick={() => authClient.signOut()}>
              Logout
            </Button> */}
            <LogoutButton />
          </div>
        )}
      </div>
    </header>
  );
}
