import { useState } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, getProductTypeColor } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight, Loader2, ShoppingCart, MapPin, Code } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id);
  const [activeTab, setActiveTab] = useState("details");

  const { data: product, isLoading, isError } = useQuery<Product>({
    queryKey: [`/api/products/${id}`],
  });

  // Display loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin text-accent-purple mx-auto mb-4" />
            <h2 className="text-xl font-medium">Loading product details...</h2>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Display error state
  if (isError || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center max-w-md px-4">
            <div className="mb-4 text-destructive">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/products">
              <Button>Browse All Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Get product type icon and color
  const productTypeIcon =
    product.type === "map" ? (
      <MapPin className="h-4 w-4 mr-1" />
    ) : (
      <Code className="h-4 w-4 mr-1" />
    );

  const productTypeColor = product.type === "map" ? "purple" : "blue";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-6">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/products/${product.type}`}>
                {product.type.charAt(0).toUpperCase() + product.type.slice(1)}s
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem className="max-w-[200px] truncate">
              <BreadcrumbLink href={`/product/${product.id}`} className="truncate">
                {product.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              <div className="aspect-[16/10] bg-background relative">
                <div className="absolute inset-0 bg-gradient-to-br from-background/20 to-background/5 flex items-center justify-center">
                  {product.type === "map" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="96"
                      height="96"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-accent-purple/30"
                    >
                      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                      <line x1="9" x2="9" y1="3" y2="18" />
                      <line x1="15" x2="15" y1="6" y2="21" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="96"
                      height="96"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-accent-blue/30"
                    >
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                    </svg>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Badge className={`mb-2 bg-accent-${productTypeColor}/20 text-accent-${productTypeColor} hover:bg-accent-${productTypeColor}/30`}>
                <div className="flex items-center">
                  {productTypeIcon}
                  {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
                </div>
              </Badge>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground mb-6">{product.description}</p>

              <div className="mb-6">
                <div className="text-3xl font-bold text-accent-purple mb-4">
                  {formatCurrency(product.price)}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.map((feature, index) => (
                    <Badge key={index} variant="outline">
                      {feature}
                    </Badge>
                  ))}
                </div>
                <Link href={`/checkout/${product.id}`}>
                  <Button size="lg" className="w-full sm:w-auto">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Purchase Now
                  </Button>
                </Link>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-medium mb-2">How to Purchase</h3>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-purple/10 flex items-center justify-center text-accent-purple">
                      1
                    </span>
                    <span>Click the Purchase button above to proceed</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-purple/10 flex items-center justify-center text-accent-purple">
                      2
                    </span>
                    <span>Enter your Discord username and ID</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-purple/10 flex items-center justify-center text-accent-purple">
                      3
                    </span>
                    <span>Join our Discord to complete the payment and receive your product</span>
                  </li>
                </ol>
              </div>
            </motion.div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Product Details</TabsTrigger>
              <TabsTrigger value="support">Support & FAQ</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4">Product Details</h2>
                <p className="text-muted-foreground mb-6">
                  {product.description}
                </p>

                <h3 className="font-bold mb-3">Features</h3>
                <ul className="space-y-3 mb-6">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`text-accent-${productTypeColor} mt-1 mr-3`}
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="font-bold mb-3">What You'll Get</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`text-accent-${productTypeColor} mt-1 mr-3`}
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>
                      {product.type === "map"
                        ? "Full access to the complete map"
                        : "Complete script files ready to use"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`text-accent-${productTypeColor} mt-1 mr-3`}
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>Detailed documentation and installation instructions</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`text-accent-${productTypeColor} mt-1 mr-3`}
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>Post-purchase support via our Discord server</span>
                  </li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="support" className="mt-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4">Support & FAQ</h2>
                
                <div className="mb-6">
                  <h3 className="font-bold mb-3">How to get help</h3>
                  <p className="text-muted-foreground mb-3">
                    If you encounter any issues with your purchase or have questions about this {product.type}, our support team is ready to assist you.
                  </p>
                  <div className="bg-background border border-border rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-accent-purple"
                      >
                        <path d="M9 17l6-6-6-6" />
                      </svg>
                      <span className="font-medium">Discord Support</span>
                    </div>
                    <p className="text-sm text-muted-foreground ml-7">
                      Join our Discord server and open a ticket in the #support channel. Our staff will assist you as soon as possible.
                    </p>
                  </div>
                </div>
                
                <h3 className="font-bold mb-3">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div className="border border-border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Is this {product.type} compatible with all Roblox games?</h4>
                    <p className="text-sm text-muted-foreground">
                      {product.type === "map"
                        ? "This map is designed to work as a standalone Roblox game. It includes all necessary scripts and assets."
                        : "This script is designed to work with most Roblox games, but compatibility may vary. Check the product description for specific compatibility details."}
                    </p>
                  </div>
                  
                  <div className="border border-border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Can I get a refund if I'm not satisfied?</h4>
                    <p className="text-sm text-muted-foreground">
                      We offer a 24-hour refund policy if the product doesn't work as described. Contact our support team on Discord to request a refund.
                    </p>
                  </div>
                  
                  <div className="border border-border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Do you offer updates for this {product.type}?</h4>
                    <p className="text-sm text-muted-foreground">
                      Yes, we provide updates to ensure compatibility with the latest Roblox versions. Updates are announced in our Discord server.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
