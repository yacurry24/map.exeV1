import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Product } from "@shared/schema";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
      style={{
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: isHovered
          ? `0 10px 25px -5px ${
              product.type === "map"
                ? "rgba(123, 58, 237, 0.2)"
                : "rgba(59, 130, 246, 0.2)"
            }`
          : "",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-48 bg-background relative">
        <div className="absolute inset-0 bg-gradient-to-br from-background/20 to-background/5 flex items-center justify-center">
          {product.type === "map" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
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
              width="64"
              height="64"
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
        <div className="absolute top-3 left-3">
          <Badge
            className={`${
              product.type === "map"
                ? "bg-accent-purple/80 hover:bg-accent-purple/70"
                : "bg-accent-blue/80 hover:bg-accent-blue/70"
            }`}
          >
            {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
          </Badge>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium mb-1 text-lg">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 h-10">
          {product.description}
        </p>
        <div className="flex flex-wrap gap-1 mb-3">
          {product.features.slice(0, 3).map((feature, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {feature}
            </Badge>
          ))}
          {product.features.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{product.features.length - 3} more
            </Badge>
          )}
        </div>
        <div className="flex justify-between items-center">
          <span
            className={`${
              product.type === "map" ? "text-accent-purple" : "text-accent-blue"
            } font-medium`}
          >
            {formatCurrency(product.price)}
          </span>
          <Link href={`/product/${product.id}`}>
            <Button
              variant="outline"
              size="sm"
              className={`text-xs ${
                isHovered && product.type === "map"
                  ? "bg-accent-purple text-white hover:bg-accent-purple/90"
                  : isHovered && product.type === "script"
                  ? "bg-accent-blue text-white hover:bg-accent-blue/90"
                  : ""
              }`}
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
