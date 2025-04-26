import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { CreditCard, Map, Code, ShoppingCart, Users, CheckCircle, Clock, XCircle } from "lucide-react";

interface DashboardCardsProps {
  totalProducts: number;
  mapProducts: number;
  scriptProducts: number;
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  totalStaff: number;
  adminStaff: number;
}

export function DashboardCards({
  totalProducts,
  mapProducts,
  scriptProducts,
  totalOrders,
  pendingOrders,
  completedOrders,
  cancelledOrders,
  totalRevenue,
  totalStaff,
  adminStaff
}: DashboardCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Revenue
          </CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent-purple">
            {formatCurrency(totalRevenue)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            From {completedOrders} completed orders
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Products
          </CardTitle>
          <div className="flex space-x-1">
            <Map className="h-4 w-4 text-accent-purple" />
            <Code className="h-4 w-4 text-accent-blue" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProducts}</div>
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-muted-foreground flex items-center">
              <Map className="h-3 w-3 mr-1 text-accent-purple" />
              <span>{mapProducts} Maps</span>
            </p>
            <p className="text-xs text-muted-foreground flex items-center">
              <Code className="h-3 w-3 mr-1 text-accent-blue" />
              <span>{scriptProducts} Scripts</span>
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Orders
          </CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalOrders}</div>
          <div className="grid grid-cols-3 gap-1 mt-1">
            <p className="text-xs text-muted-foreground flex items-center">
              <Clock className="h-3 w-3 mr-1 text-yellow-500" />
              <span>{pendingOrders}</span>
            </p>
            <p className="text-xs text-muted-foreground flex items-center">
              <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
              <span>{completedOrders}</span>
            </p>
            <p className="text-xs text-muted-foreground flex items-center">
              <XCircle className="h-3 w-3 mr-1 text-red-500" />
              <span>{cancelledOrders}</span>
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Staff Members
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalStaff}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {adminStaff} administrators
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
