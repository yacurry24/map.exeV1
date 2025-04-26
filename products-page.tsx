import { useParams } from "wouter";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductGrid } from "@/components/products/product-grid";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MapPin, Code } from "lucide-react";

export default function ProductsPage() {
  const params = useParams<{ type?: string }>();
  const type = params.type as "map" | "script" | undefined;

  // Define page metadata based on type
  const pageTitle = type
    ? `${type.charAt(0).toUpperCase() + type.slice(1)}s`
    : "All Products";

  const pageDescription = type === "map"
    ? "Browse our collection of premium Roblox maps, manually reviewed for quality and gameplay experience."
    : type === "script"
    ? "Explore our collection of powerful Roblox scripts to enhance your gaming experience."
    : "Discover our complete collection of premium Roblox maps and scripts.";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <section className="py-8 md:py-12 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{pageTitle}</h1>
              <p className="text-muted-foreground mb-6">{pageDescription}</p>
              
              {/* Category tabs */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link href="/products">
                  <Button
                    variant={!type ? "default" : "outline"}
                    className="rounded-full"
                  >
                    All Products
                  </Button>
                </Link>
                <Link href="/products/map">
                  <Button
                    variant={type === "map" ? "default" : "outline"}
                    className={`rounded-full ${
                      type === "map" ? "bg-accent-purple hover:bg-accent-purple/90" : ""
                    }`}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Maps
                  </Button>
                </Link>
                <Link href="/products/script">
                  <Button
                    variant={type === "script" ? "default" : "outline"}
                    className={`rounded-full ${
                      type === "script" ? "bg-accent-blue hover:bg-accent-blue/90" : ""
                    }`}
                  >
                    <Code className="h-4 w-4 mr-2" />
                    Scripts
                  </Button>
                </Link>
              </div>
            </div>
            
            <ProductGrid type={type} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
