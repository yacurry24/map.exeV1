import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Product } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Loader2, Check, MapPin, Code } from "lucide-react";

// Form schema
const checkoutSchema = z.object({
  discordUsername: z
    .string()
    .min(2, "Discord username must be at least 2 characters")
    .max(32, "Discord username cannot exceed 32 characters")
    .regex(
      /^.{2,32}#[0-9]{4}$/,
      "Please enter a valid Discord username (e.g., Username#1234)"
    ),
  discordId: z
    .string()
    .min(17, "Discord ID must be at least 17 digits")
    .max(19, "Discord ID cannot exceed 19 digits")
    .regex(/^[0-9]{17,19}$/, "Please enter a valid Discord ID (17-19 digits)"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const params = useParams<{ id: string }>();
  const productId = parseInt(params.id);
  const [location, setLocation] = useLocation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  // Get product details
  const { data: product, isLoading: isProductLoading } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`],
  });

  // Form
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      discordUsername: "",
      discordId: "",
    },
  });

  // Create order mutation
  const orderMutation = useMutation({
    mutationFn: async (data: CheckoutFormValues) => {
      const response = await apiRequest("POST", "/api/orders", {
        ...data,
        productId,
        price: product?.price,
        status: "pending",
      });
      return await response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Order placed successfully",
        description: "Please join our Discord server to complete the payment.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to place order",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    orderMutation.mutate(data);
  };

  // Display loading state
  if (isProductLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin text-accent-purple mx-auto mb-4" />
            <h2 className="text-xl font-medium">Loading checkout...</h2>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Display error state if product not found
  if (!product) {
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
              The product you're trying to purchase doesn't exist or has been removed.
            </p>
            <Button onClick={() => setLocation("/products")}>
              Browse Products
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Get product type icon
  const productTypeIcon =
    product.type === "map" ? (
      <MapPin className="h-4 w-4 mr-1" />
    ) : (
      <Code className="h-4 w-4 mr-1" />
    );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

            {isSubmitted ? (
              <Card>
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-500" />
                  </div>
                  <CardTitle className="text-2xl">Order Placed Successfully!</CardTitle>
                  <CardDescription>
                    Your order has been received and is pending payment.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Next Steps</h3>
                    <ol className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex gap-2">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-purple/10 flex items-center justify-center text-accent-purple">
                          1
                        </span>
                        <span>Join our Discord server using the link below</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-purple/10 flex items-center justify-center text-accent-purple">
                          2
                        </span>
                        <span>Go to the #orders channel and mention your order details</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-purple/10 flex items-center justify-center text-accent-purple">
                          3
                        </span>
                        <span>A staff member will assist you with payment and delivery</span>
                      </li>
                    </ol>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <a
                    href="https://discord.gg/mapexe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button className="w-full">
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
                        className="mr-2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 12h8" />
                        <path d="M12 8v8" />
                      </svg>
                      Join Discord Server
                    </Button>
                  </a>
                  <Button variant="outline" onClick={() => setLocation("/products")}>
                    Continue Shopping
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Information</CardTitle>
                      <CardDescription>
                        Please enter your Discord details to proceed with the purchase.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="space-y-6"
                        >
                          <FormField
                            control={form.control}
                            name="discordUsername"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Discord Username</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Username#1234"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Your Discord username including the 4-digit tag (e.g., Username#1234)
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="discordId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Discord ID</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="123456789012345678"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Your 17-19 digit Discord ID (right-click your username in Discord and select "Copy ID")
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            type="submit"
                            className="w-full"
                            disabled={orderMutation.isPending}
                          >
                            {orderMutation.isPending && (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Place Order
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </div>
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-16 bg-background rounded flex items-center justify-center flex-shrink-0">
                          {product.type === "map" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-accent-purple"
                            >
                              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                              <line x1="9" x2="9" y1="3" y2="18" />
                              <line x1="15" x2="15" y1="6" y2="21" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-accent-blue"
                            >
                              <polyline points="16 18 22 12 16 6" />
                              <polyline points="8 6 2 12 8 18" />
                              <line x1="15" y1="9" x2="9" y2="15" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <div
                              className={`text-xs rounded-full px-2 py-0.5 mr-2 ${
                                product.type === "map"
                                  ? "bg-accent-purple/20 text-accent-purple"
                                  : "bg-accent-blue/20 text-accent-blue"
                              }`}
                            >
                              <div className="flex items-center">
                                {productTypeIcon}
                                {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
                              </div>
                            </div>
                          </div>
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {product.description}
                          </p>
                        </div>
                      </div>
                      <div className="border-t border-border pt-4">
                        <div className="flex justify-between mb-2">
                          <span>Price</span>
                          <span>{formatCurrency(product.price)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span className="text-accent-purple">
                            {formatCurrency(product.price)}
                          </span>
                        </div>
                      </div>
                      <div className="bg-background rounded-lg p-3 text-sm text-muted-foreground">
                        <p>
                          After placing your order, you'll need to join our Discord server to complete the payment process and receive your {product.type}.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
