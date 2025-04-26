import { Helmet } from "react-helmet";
import { Sidebar } from "@/components/admin/sidebar";
import { OrderList } from "@/components/admin/order-list";

export default function OrdersPage() {
  return (
    <>
      <Helmet>
        <title>Orders | map.exe Admin</title>
      </Helmet>
      <Sidebar>
        <div className="h-full px-4 py-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
              <p className="text-muted-foreground">
                Manage customer orders and track payment status
              </p>
            </div>
          </div>
          
          <OrderList />
        </div>
      </Sidebar>
    </>
  );
}
