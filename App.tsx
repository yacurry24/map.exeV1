import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "@/pages/home-page";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import ProductsPage from "@/pages/products-page";
import ProductDetailsPage from "@/pages/product-details-page";
import CheckoutPage from "@/pages/checkout-page";
import { PolicyPage } from "./pages/policy-page";
import DashboardPage from "@/pages/admin/dashboard";
import ProductsAdminPage from "@/pages/admin/products";
import OrdersAdminPage from "@/pages/admin/orders";
import StaffAdminPage from "@/pages/admin/staff";
import { ThemeProvider } from "@/components/ui/theme-provider";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/products/:type" component={ProductsPage} />
      <Route path="/product/:id" component={ProductDetailsPage} />
      <Route path="/checkout/:id" component={CheckoutPage} />
      <Route path="/policies" component={PolicyPage} />
      <ProtectedRoute path="/admin" component={DashboardPage} />
      <ProtectedRoute path="/admin/products" component={ProductsAdminPage} />
      <ProtectedRoute path="/admin/orders" component={OrdersAdminPage} />
      <ProtectedRoute path="/admin/staff" component={StaffAdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
