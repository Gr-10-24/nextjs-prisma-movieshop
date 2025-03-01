import OrderStat from "@/components/ui/admin-dashboard/order-stat";
import { FetchOrders } from "../../../app/actions/order";
import SalesGraph from "@/components/ui/admin-dashboard/sales-graph";
import ScrollAreaStock from "@/components/ui/admin-dashboard/scroll-Area_stock";
import FetchMovies from "../../../app/actions/customer-movie";


export default async function AdminDashboard() {
  const order = await FetchOrders();
  const movies = await FetchMovies();

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <h1 className="text-2xl font-semibold">Business Analytics and Admin Panel</h1>
      <div>
        <OrderStat order={order} />
      </div>
      <div className="flex w-200 h-100 mt-8 ml-8">
        <SalesGraph order={order} />
        <div className="ml-20">
          <ScrollAreaStock movie={movies} />
        </div>
        
      </div>
    </div>
  );
}
