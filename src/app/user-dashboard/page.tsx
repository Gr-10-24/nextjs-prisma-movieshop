import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserDetails, getUserOrders } from "../actions/userOrders";
import { Film, Trash } from "lucide-react";
import UserMovieForm from "@/components/ui/userDashboard/userForm";

export default async function UserDash() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return <p>You need to log in to see your orders.</p>;

  const orders = await getUserOrders(session.user.id);
  const user = await getUserDetails(session.user.id); 

  if (!user) {
    return <p>Error: User data could not be loaded.</p>; 
  }
  return (
    <main className=" flex container mx-auto">
      <div className=" border w-1/2 lg:w-1/3 py-5 pr-8">
          <div className="flex container justify-center">
            <h1 className="text-2xl text-black p-3">User Details</h1>
          </div>
          <div className="flex container justify-center">
          <UserMovieForm user={user} />
          </div>
      </div>
      <div className=" border w-1/2 lg:w-2/3 py-5 pr-8">
      <h1 className="text-2xl font-bold pl-6">Your Order History</h1>
      {orders.length > 0 ? (
        <ul className="mt-4 space-y-4 pl-10">
          {orders.map((order) => (
            <li key={order.id} className="border p-4 rounded-lg shadow">
              <p className="font-semibold">Order ID: {order.id}</p>
              <p>Status: {order.status}</p>
              <p>Total: {order.totalAmount.toFixed(2)}kr</p>
              <ul className="mt-2 list-disc">
                {order.items.map((item) => (
                  <li key={item.id} className="ml-4 text-sm" >
                   {item.movie.title} - {item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4">No orders found.</p>
      )}
          
      </div>



    </main>
  );
}
