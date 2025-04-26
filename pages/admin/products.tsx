import { Helmet } from "react-helmet";
import { Sidebar } from "@/components/admin/sidebar";
import { ProductList } from "@/components/admin/product-list";

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title>Products | map.exe Admin</title>
      </Helmet>
      <Sidebar>
        <div className="h-full px-4 py-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Products</h2>
              <p className="text-muted-foreground">
                Manage your Roblox maps and scripts
              </p>
            </div>
          </div>
          
          <ProductList />
        </div>
      </Sidebar>
    </>
  );
}
