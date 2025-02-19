// import SignUpForm from "@/components/signup-form";
import CartList from "@/components/shopping-cart/cart-list";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getCartFront } from "../actions/cart";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const cart = await getCartFront();

  return (
    <main className="flex flex-col container mx-auto py-12 gap-2">
      {!session && (
        <div className="flex justify-end mb-6">You are not logged in.</div>
      )}
      {session?.user.role === "ADMIN" && (
        <div className="flex justify-end mb-6">
          This is shown if you are logged in as Admin.
        </div>
      )}
      {session?.user.role === "CUSTOMER" && (
        <div className="flex mx-auto mb-6">
          {cart === undefined ? (
            <p>Your cart is empty</p>
          ) : (
            <CartList cart={cart} />
          )}
        </div>
      )}
    </main>
  );
}
