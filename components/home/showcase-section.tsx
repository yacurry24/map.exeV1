import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { formatCurrency } from "@/lib/utils";

export function ShowcaseSection() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const featuredProducts = products.slice(0, 3);

  return (
    <section id="showcase" className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center justify-center mb-8"
          >
            <div className="h-0.5 bg-accent-purple/30 w-12"></div>
            <h2 className="text-2xl font-bold px-4">Featured Showcase</h2>
            <div className="h-0.5 bg-accent-purple/30 w-12"></div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-muted-foreground mb-12 text-center"
          >
            Explore some of our most popular Roblox maps and scripts currently available.
          </motion.p>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-background border border-border rounded-xl overflow-hidden animate-pulse">
                  <div className="h-40 bg-muted"></div>
                  <div className="p-4">
                    <div className="h-4 bg-muted rounded w-2/3 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-full mb-3"></div>
                    <div className="h-3 bg-muted rounded w-full mb-3"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-4 bg-muted rounded w-1/4"></div>
                      <div className="h-6 bg-muted rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-background border border-border rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="h-40 bg-muted relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-background/5 to-background/30 flex items-center justify-center">
                      {product.type === 'map' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-accent-purple/30">
                          <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                          <line x1="9" x2="9" y1="3" y2="18" />
                          <line x1="15" x2="15" y1="6" y2="21" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-accent-blue/30">
                          <polyline points="16 18 22 12 16 6" />
                          <polyline points="8 6 2 12 8 18" />
                          <line x1="15" y1="9" x2="9" y2="15" />
                        </svg>
                      )}
                    </div>
                    <div className="absolute top-3 left-3">
                      <div className={`${product.type === 'map' ? 'bg-accent-purple/80' : 'bg-accent-blue/80'} rounded-full px-3 py-1 text-xs inline-flex items-center`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          {product.type === 'map' ? (
                            <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                          ) : (
                            <polyline points="16 18 22 12 16 6" />
                          )}
                        </svg>
                        <span>{product.type === 'map' ? 'Map' : 'Script'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className={`${product.type === 'map' ? 'text-accent-purple' : 'text-accent-blue'} font-medium`}>
                        {formatCurrency(product.price)}
                      </span>
                      <Link href={`/product/${product.id}`}>
                        <Button variant="outline" size="sm" className="text-xs">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <Link href="/products">
              <Button variant="outline" className="inline-flex items-center">
                <span>View Full Catalog</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
