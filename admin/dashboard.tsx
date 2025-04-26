import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/admin/sidebar";
import { DashboardCards } from "@/components/admin/dashboard-cards";
import { DashboardCharts } from "@/components/admin/dashboard-charts";
import { DashboardRecentOrders } from "@/components/admin/dashboard-recent-orders";
import { Order, Product, User } from "@shared/schema";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { data: products = [], isLoading: isProductsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: orders = [], isLoading: isOrdersLoading } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
  });

  const { data: users = [], isLoading: isUsersLoading } = useQuery<User[]>({
    queryKey: ["/api/users"],
  });

  const isLoading = isProductsLoading || isOrdersLoading || isUsersLoading;

  // Calculate stats
  const totalProducts = products.length;
  const mapProducts = products.filter(p => p.type === "map").length;
  const scriptProducts = products.filter(p => p.type === "script").length;
  
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === "pending").length;
  const completedOrders = orders.filter(o => o.status === "completed").length;
  const cancelledOrders = orders.filter(o => o.status === "cancelled").length;
  
  const totalRevenue = orders
    .filter(o => o.status === "completed")
    .reduce((sum, order) => sum + order.price, 0);
  
  const totalStaff = users.length;
  const adminStaff = users.filter(u => u.isAdmin).length;

  return (
    <>
      <Helmet>
        <title>Dashboard | map.exe Admin</title>
      </Helmet>
      <Sidebar>
        <div className="h-full px-4 py-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              <p className="text-muted-foreground">
                Overview of your map.exe statistics and recent activity
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <Loader2 className="h-8 w-8 animate-spin text-accent-purple" />
            </div>
          ) : (
            <div className="space-y-8">
              <DashboardCards 
                totalProducts={totalProducts}
                mapProducts={mapProducts}
                scriptProducts={scriptProducts}
                totalOrders={totalOrders}
                pendingOrders={pendingOrders}
                completedOrders={completedOrders}
                cancelledOrders={cancelledOrders}
                totalRevenue={totalRevenue}
                totalStaff={totalStaff}
                adminStaff={adminStaff}
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <DashboardCharts products={products} orders={orders} />
                <DashboardRecentOrders orders={orders} products={products} />
              </div>
            </div>
          )}
        </div>
      </Sidebar>
    </>
  );
}
