import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import { Logo } from "@/components/ui/logo";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  Menu,
} from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function Sidebar({ className, children }: SidebarProps) {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const routes = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/admin",
      active: location === "/admin",
    },
    {
      label: "Products",
      icon: <Package className="h-5 w-5" />,
      href: "/admin/products",
      active: location === "/admin/products",
    },
    {
      label: "Orders",
      icon: <ShoppingCart className="h-5 w-5" />,
      href: "/admin/orders",
      active: location === "/admin/orders",
    },
    {
      label: "Staff",
      icon: <Users className="h-5 w-5" />,
      href: "/admin/staff",
      active: location === "/admin/staff",
    },
  ];

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="lg:hidden mr-2">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <MobileSidebar 
            routes={routes} 
            setOpen={setOpen} 
            handleLogout={handleLogout}
          />
        </SheetContent>
      </Sheet>
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen lg:w-64 border-r border-border hidden lg:block",
          className
        )}
      >
        <div className="h-full flex flex-col bg-background">
          <div className="h-16 flex items-center gap-2 border-b border-border px-6">
            <Logo />
            <span className="font-semibold text-sm">ADMIN</span>
          </div>
          <ScrollArea className="flex-1 overflow-auto py-2">
            <nav className="grid gap-1 px-2">
              {routes.map((route, i) => (
                <Link
                  key={i}
                  href={route.href}
                  onClick={() => setOpen(false)}
                >
                  <Button
                    variant={route.active ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 font-normal",
                      route.active && "bg-accent-purple/10 text-accent-purple hover:bg-accent-purple/20"
                    )}
                  >
                    {route.icon}
                    {route.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </ScrollArea>
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-9 w-9 rounded-full bg-accent-purple/10 flex items-center justify-center text-accent-purple">
                {user?.username.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <div className="font-medium text-sm">{user?.username}</div>
                <div className="text-xs text-muted-foreground">
                  {user?.isAdmin ? "Administrator" : "Staff"}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 font-normal"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
      <div className="lg:pl-64">{children}</div>
    </>
  );
}

interface MobileSidebarProps {
  routes: {
    label: string;
    icon: React.ReactNode;
    href: string;
    active: boolean;
  }[];
  setOpen: (open: boolean) => void;
  handleLogout: () => void;
}

function MobileSidebar({ routes, setOpen, handleLogout }: MobileSidebarProps) {
  const { user } = useAuth();

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="h-16 flex items-center gap-2 border-b border-border px-6">
        <Logo />
        <span className="font-semibold text-sm">ADMIN</span>
      </div>
      <ScrollArea className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {routes.map((route, i) => (
            <Link
              key={i}
              href={route.href}
              onClick={() => setOpen(false)}
            >
              <Button
                variant={route.active ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 font-normal",
                  route.active && "bg-accent-purple/10 text-accent-purple hover:bg-accent-purple/20"
                )}
              >
                {route.icon}
                {route.label}
              </Button>
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-9 w-9 rounded-full bg-accent-purple/10 flex items-center justify-center text-accent-purple">
            {user?.username.slice(0, 1).toUpperCase()}
          </div>
          <div>
            <div className="font-medium text-sm">{user?.username}</div>
            <div className="text-xs text-muted-foreground">
              {user?.isAdmin ? "Administrator" : "Staff"}
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 font-normal"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}
