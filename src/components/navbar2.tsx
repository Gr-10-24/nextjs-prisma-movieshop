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
import DashboardButton from "./ui/userDashboard/dashboard-button";

export default async function NavBar2() {
  //const session = authClient.useSession();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  //const cart = await getOrCreateCart();
  const cart = await getCartFront();

  return (
    <header className="bg-primary z-50 top-0 sticky">
      {" "}
      {/*top-0 sticky origin-top*/}
      <div className="flex flex-row justify-between py-4 container mx-auto">
        <div>
          <Link href="/" prefetch={true}>
            <h1 className="text-2xl font-bold text-primary-foreground">
              Movie Bazaar
            </h1>
          </Link>
        </div>
        <div>
          <Link href="/customer-landing-page" prefetch={true}>
            <Button className="m-1" variant={"secondary"}>
              landing
            </Button>
          </Link>
          <Link href="/customer-movies" prefetch={true}>
            <Button className="m-1" variant={"secondary"}>
              movies
            </Button>
          </Link>
          <Link href="/genre" prefetch={true}>
            <Button className="m-1" variant={"secondary"}>
              genre
            </Button>
          </Link>
          <Link href="/people" prefetch={true}>
            <Button className="m-1" variant={"secondary"}>
              people
            </Button>
          </Link>
          {session?.user.role === "ADMIN" ? (
            <Link href="/movie" prefetch={true}>
              <Button className="m-1" variant={"secondary"}>
                A-movie
              </Button>
            </Link>
          ) : (
            ""
          )}
          {/* <Link href="/movie">
            <Button className="m-1" variant={"secondary"}>
              A-movie
            </Button>
          </Link> */}
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
            <DashboardButton />

            <LogoutButton />
          </div>
        )}
      </div>
    </header>
  );
}
