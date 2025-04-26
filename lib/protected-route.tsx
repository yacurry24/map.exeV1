import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route, useLocation } from "wouter";

export function ProtectedRoute({
  path,
  component: Component,
}: {
  path: string;
  component: () => React.JSX.Element;
}) {
  const { user, isLoading } = useAuth();
  const [location] = useLocation();
  
  // More robust route protection that persists theme between page navigations
  return (
    <Route path={path}>
      {({}) => {
        // While loading, show spinner
        if (isLoading) {
          return (
            <div className="flex items-center justify-center min-h-screen">
              <Loader2 className="h-8 w-8 animate-spin text-accent-purple" />
            </div>
          );
        }
        
        // If not authenticated, redirect to auth page
        if (!user) {
          return <Redirect to="/auth" />;
        }
        
        // If authenticated, render the component
        return <Component />;
      }}
    </Route>
  );
}
