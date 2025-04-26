import { pgTable, text, serial, integer, boolean, jsonb, timestamp, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users (staff members)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  isAdmin: true,
});

// Products (Maps and Scripts)
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: doublePrecision("price").notNull(),
  type: text("type").notNull(), // "map" or "script"
  features: jsonb("features").notNull(), // Array of features
  images: jsonb("images").notNull(), // Array of image URLs
  createdAt: timestamp("created_at").notNull().defaultNow(),
  createdBy: integer("created_by").notNull(), // User ID
});

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  description: true,
  price: true,
  type: true,
  features: true,
  images: true,
  createdBy: true,
});

// Orders
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  discordUsername: text("discord_username").notNull(),
  discordId: text("discord_id").notNull(),
  productId: integer("product_id").notNull(),
  price: doublePrecision("price").notNull(),
  status: text("status").notNull().default("pending"), // pending, completed, cancelled
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertOrderSchema = createInsertSchema(orders).pick({
  discordUsername: true,
  discordId: true,
  productId: true,
  price: true,
  status: true,
});

// Testimonials
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(), // e.g., "Map Purchaser", "Script User"
  rating: integer("rating").notNull(),
  content: text("content").notNull(),
  verified: boolean("verified").notNull().default(false),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).pick({
  name: true,
  role: true,
  rating: true,
  content: true,
  verified: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

// Extended schemas for form validation
export const productTypeEnum = z.enum(["map", "script"]);
export const orderStatusEnum = z.enum(["pending", "completed", "cancelled"]);

export const extendedInsertProductSchema = insertProductSchema.extend({
  type: productTypeEnum,
  features: z.array(z.string()),
  images: z.array(z.string()),
  price: z.number().positive().min(0.01),
});

export const extendedInsertOrderSchema = insertOrderSchema.extend({
  status: orderStatusEnum,
});
