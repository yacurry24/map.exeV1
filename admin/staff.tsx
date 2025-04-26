import { Helmet } from "react-helmet";
import { Sidebar } from "@/components/admin/sidebar";
import { StaffList } from "@/components/admin/staff-list";
import { useAuth } from "@/hooks/use-auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export default function StaffPage() {
  const { user } = useAuth();
  
  // Only admin users should be able to manage staff
  const isAdmin = user?.isAdmin;

  return (
    <>
      <Helmet>
        <title>Staff Management | map.exe Admin</title>
      </Helmet>
      <Sidebar>
        <div className="h-full px-4 py-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Staff Management</h2>
              <p className="text-muted-foreground">
                Manage staff accounts and permissions
              </p>
            </div>
          </div>

          {!isAdmin ? (
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <AlertTitle>Access Denied</AlertTitle>
              <AlertDescription>
                You don't have administrator privileges required to manage staff accounts.
              </AlertDescription>
            </Alert>
          ) : (
            <StaffList />
          )}
        </div>
      </Sidebar>
    </>
  );
}
