import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, getOrderStatusColor } from "@/lib/utils";
import { Order, Product } from "@shared/schema";
import { ChevronRight } from "lucide-react";

interface DashboardRecentOrdersProps {
  orders: Order[];
  products: Product[];
}

export function DashboardRecentOrders({ orders, products }: DashboardRecentOrdersProps) {
  const [, navigate] = useLocation();
  const [visible, setVisible] = useState(5);
  
  // Sort orders by creation date (newest first)
  const sortedOrders = [...orders].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  // Get only the most recent ones based on visible count
  const recentOrders = sortedOrders.slice(0, visible);
  
  // Get product name by ID
  const getProductName = (productId: number) => {
    const product = products.find(p => p.id === productId);
    return product?.name || "Unknown Product";
  };
  
  // Get product type by ID
  const getProductType = (productId: number) => {
    const product = products.find(p => p.id === productId);
    return product?.type || "unknown";
  };

  // Load more orders
  const loadMore = () => {
    setVisible(prev => Math.min(prev + 5, orders.length));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Showing {Math.min(visible, orders.length)} of {orders.length} orders
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate("/admin/orders")}>
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="text-muted-foreground mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <h3 className="text-lg font-medium">No orders yet</h3>
            <p className="text-muted-foreground mt-1 text-sm">
              Orders will appear here as customers make purchases
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentOrders.map((order) => {
              const productType = getProductType(order.productId);
              const statusColor = getOrderStatusColor(order.status);
              const orderDate = new Date(order.createdAt).toLocaleDateString();
              
              return (
                <div key={order.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline" 
                        className={`${
                          productType === 'map' 
                            ? 'text-accent-purple border-accent-purple/50' 
                            : 'text-accent-blue border-accent-blue/50'
                        }`}
                      >
                        {productType}
                      </Badge>
                      <span className="font-medium truncate max-w-[150px] sm:max-w-[200px]">
                        {getProductName(order.productId)}
                      </span>
                    </div>
                    <div className="flex gap-2 text-sm text-muted-foreground">
                      <span>#{order.id}</span>
                      <span>•</span>
                      <span className="truncate max-w-[100px] sm:max-w-full">
                        {order.discordUsername}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div>
                      <Badge className={`bg-${statusColor}-500/20 text-${statusColor}-500 hover:bg-${statusColor}-500/30`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-end gap-2 mt-1">
                      <span className="text-sm font-medium">
                        {formatCurrency(order.price)}
                      </span>
                      <span className="text-xs text-muted-foreground">{orderDate}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
      {visible < orders.length && (
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={loadMore}>
            Load More
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
