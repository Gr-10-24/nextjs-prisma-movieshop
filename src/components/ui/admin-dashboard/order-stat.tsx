"use client";

import { $Enums } from "@prisma/client";

export interface OrderProp {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: $Enums.ShippedStatus;
  totalAmount: number;
  items: {
    id: string;
    price: number;
    movie: {
      id: string;
      price: number;
      title: string;
      stock: number;
      releaseDate: number;
      runtime: string;
      genre: {
        id: string;
        name: string;
      }[];
      starring: {
        id: string;
        role: $Enums.Role;
        person: {
          id: string;
          name: string;
        };
      }[];
    };
  }[];
}

export default function OrderStat({ order }: { order: OrderProp[] }) {
  {
    /* sort the orders by createdDate */
  }
  const sortByCreatedDate = order.sort(
    (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
  );

  {
    /* Calculating the total revenue */
  }
  const grandRevenue = order.reduce((total, order) => {
    return total + order.totalAmount;
  }, 0);

  const isThisMonth = order
    .filter(
      (order) =>
        order.createdAt.getMonth() === new Date().getMonth() &&
        order.createdAt.getFullYear() === new Date().getFullYear()
    )
    .reduce((total, order) => {
      return total + order.totalAmount;
    }, 0);

  {
    /* Calculating the number of delivery pending orders and total cost */
  }
  const deliveryPending = order.filter((order) => order.status === "PENDING");
  const pendingCost = deliveryPending.reduce((total, order) => {
    return total + order.totalAmount;
  }, 0);

  {
    /* Calculating the number of shipped orders and total cost */
  }
  const shippedOrders = order.filter((order) => order.status === "SHIPPED");
  const shippedCost = shippedOrders.reduce((total, order) => {
    return total + order.totalAmount;
  }, 0);

  return (
    <div className="flex mr-20">
      {/* Render Total Revenue of the business */}
      <div className=" w-[300px] border mt-8 ml-8 border-purple-800 rounded-md md:border-4">
        <div className="flex justify-center mb-4">
          <h1 className="text-xl font-bold pl-2 pt-4">TOTAL REVENUE</h1>
        </div>
        {sortByCreatedDate && (
          <p className="pl-2">
            From :{sortByCreatedDate[0].createdAt.toDateString()}
          </p>
        )}
        <div className="pl-2 pt-2 pb-4">{grandRevenue} SEK</div>
      </div>

      {/* Render current month revenue so far */}
      <div className=" w-[300px] border mt-8 ml-8 border-purple-800 rounded-md md:border-4">
        <div className="flex justify-center mb-4">
          <h1 className="text-xl font-bold pl-2 pt-4">REVENUE THIS MONTH</h1>
        </div>
        <p className="pl-2">AS AT {new Date().toDateString()}</p>
        <div className="pl-2 pt-2 pb-4">{isThisMonth} SEK</div>
      </div>

      <div className=" w-[300px] border mt-8 ml-8 border-purple-800 rounded-md md:border-4">
        <div className="flex justify-center mb-4">
          <h1 className="text-xl font-bold pl-2 pt-4">Delivery Status</h1>
        </div>
        <p className="pl-2">AS AT {new Date().toDateString()}</p>
        <div className="flex pl-2 pt-2   pr-2 justify-between">
          <div className="text-green-800 text-md font-bold">
            Delivery Pending: {deliveryPending.length}
          </div>
          <div className="">{pendingCost} SEK</div>
        </div>
        <div className="flex pl-2  pb-4  pr-2 justify-between">
          <div className="text-orange-800 text-md font-bold">
            Shipped Orders: {shippedOrders.length}
          </div>
          <div className="">{shippedCost} SEK</div>
        </div>
      </div>
    </div>
  );
}
