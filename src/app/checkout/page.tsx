import CartList from "@/components/shopping-cart/cart-list";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getCartFront } from "../actions/cart";
import { Button } from "@/components/ui/button";
import CheckoutButton from "@/components/shopping-cart/checkout-button";

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
        <div className="flex flex-col mx-auto mb-6 gap-2">
          <div>
            {cart === undefined ? (
              <p>Your cart is empty</p>
            ) : (
              <CartList cart={cart} />
            )}
          </div>
          <div>
            {session?.user.address === undefined ? (
              <p>No address listed</p>
            ) : (
              <p>Your listed Address is: {session.user.address}</p>
            )}
          </div>
          {cart === undefined ? (
            <Button>Nothing in cart</Button>
          ) : (
            //<Button onClick={() => Checkout(cart)}>Checkout</Button>
            <CheckoutButton cart={cart} />
          )}
        </div>
      )}
    </main>
  );
}
