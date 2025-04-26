import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { z } from "zod";
import { 
  insertProductSchema, 
  extendedInsertProductSchema, 
  insertOrderSchema, 
  extendedInsertOrderSchema,
  insertTestimonialSchema 
} from "@shared/schema";

// Middleware to check if user is authenticated
const isAuthenticated = (req: Request, res: Response, next: Function) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
};

// Middleware to check if user is an admin
const isAdmin = (req: Request, res: Response, next: Function) => {
  if (req.isAuthenticated() && req.user && req.user.isAdmin) {
    return next();
  }
  res.status(403).json({ error: "Forbidden" });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Product routes
  app.get("/api/products", async (req, res, next) => {
    try {
      const type = req.query.type as 'map' | 'script' | undefined;
      const products = await storage.listProducts(type);
      res.json(products);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/products/:id", async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }
      
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/products", isAuthenticated, async (req, res, next) => {
    try {
      const validatedData = extendedInsertProductSchema.parse({
        ...req.body,
        createdBy: req.user!.id
      });
      
      const product = await storage.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      next(error);
    }
  });

  app.put("/api/products/:id", isAuthenticated, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }
      
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      // Only creator or admin can update
      if (product.createdBy !== req.user!.id && !req.user!.isAdmin) {
        return res.status(403).json({ error: "Forbidden" });
      }
      
      const validatedData = extendedInsertProductSchema.partial().parse(req.body);
      const updatedProduct = await storage.updateProduct(id, validatedData);
      res.json(updatedProduct);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      next(error);
    }
  });

  app.delete("/api/products/:id", isAuthenticated, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }
      
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      // Only creator or admin can delete
      if (product.createdBy !== req.user!.id && !req.user!.isAdmin) {
        return res.status(403).json({ error: "Forbidden" });
      }
      
      await storage.deleteProduct(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  });

  // Order routes
  app.get("/api/orders", isAuthenticated, async (req, res, next) => {
    try {
      const orders = await storage.listOrders();
      res.json(orders);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/orders/:id", isAuthenticated, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid order ID" });
      }
      
      const order = await storage.getOrder(id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      
      res.json(order);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/orders", async (req, res, next) => {
    try {
      const validatedData = extendedInsertOrderSchema.parse(req.body);
      
      // Verify the product exists and get its price
      const product = await storage.getProduct(validatedData.productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      // Override the price with the actual product price
      validatedData.price = product.price;
      
      const order = await storage.createOrder(validatedData);
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      next(error);
    }
  });

  app.put("/api/orders/:id", isAuthenticated, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid order ID" });
      }
      
      const order = await storage.getOrder(id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      
      // Only admin can update order status
      if (!req.user!.isAdmin) {
        return res.status(403).json({ error: "Forbidden" });
      }
      
      const validatedData = extendedInsertOrderSchema.partial().parse(req.body);
      const updatedOrder = await storage.updateOrder(id, validatedData);
      res.json(updatedOrder);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      next(error);
    }
  });

  // Testimonial routes
  app.get("/api/testimonials", async (req, res, next) => {
    try {
      let verified: boolean | undefined = undefined;
      
      if (req.query.verified !== undefined) {
        verified = req.query.verified === 'true';
      }
      
      const testimonials = await storage.listTestimonials(verified);
      res.json(testimonials);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/testimonials", async (req, res, next) => {
    try {
      const validatedData = insertTestimonialSchema.parse({
        ...req.body,
        verified: false // Always set verified to false for new testimonials
      });
      
      const testimonial = await storage.createTestimonial(validatedData);
      res.status(201).json(testimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      next(error);
    }
  });

  app.put("/api/testimonials/:id/verify", isAdmin, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid testimonial ID" });
      }
      
      const testimonial = await storage.getTestimonial(id);
      if (!testimonial) {
        return res.status(404).json({ error: "Testimonial not found" });
      }
      
      const updatedTestimonial = await storage.updateTestimonial(id, { verified: true });
      res.json(updatedTestimonial);
    } catch (error) {
      next(error);
    }
  });

  // User management routes (admin only)
  app.get("/api/users", isAdmin, async (req, res, next) => {
    try {
      const users = await storage.listUsers();
      // Don't return passwords
      const usersWithoutPasswords = users.map(({ password, ...user }) => user);
      res.json(usersWithoutPasswords);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/api/users/:id", isAdmin, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      
      // Prevent deleting yourself
      if (id === req.user!.id) {
        return res.status(400).json({ error: "Cannot delete your own account" });
      }
      
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      await storage.deleteUser(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  });

  app.put("/api/users/:id/make-admin", isAdmin, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      const updatedUser = await storage.updateUser(id, { isAdmin: true });
      // Don't return password
      if (updatedUser) {
        const { password, ...userWithoutPassword } = updatedUser;
        res.json(userWithoutPassword);
      } else {
        res.status(500).json({ error: "Failed to update user" });
      }
    } catch (error) {
      next(error);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
