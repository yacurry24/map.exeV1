import { 
  users, 
  type User, 
  type InsertUser, 
  products, 
  type Product, 
  type InsertProduct,
  orders,
  type Order,
  type InsertOrder,
  testimonials,
  type Testimonial,
  type InsertTestimonial 
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import connectPg from "connect-pg-simple";
import { db } from "./db";
import { pool } from "./db";
import { eq, desc, and, ilike } from "drizzle-orm";

const MemoryStore = createMemoryStore(session);
const PostgresSessionStore = connectPg(session);

// Define the storage interface
export interface IStorage {
  // Users (Staff)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  listUsers(): Promise<User[]>;
  updateUser(id: number, userData: Partial<User>): Promise<User | undefined>;
  deleteUser(id: number): Promise<boolean>;
  
  // Products
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  listProducts(type?: 'map' | 'script'): Promise<Product[]>;
  updateProduct(id: number, productData: Partial<Product>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Orders
  getOrder(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  listOrders(): Promise<Order[]>;
  updateOrder(id: number, orderData: Partial<Order>): Promise<Order | undefined>;
  
  // Testimonials
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  listTestimonials(verified?: boolean): Promise<Testimonial[]>;
  updateTestimonial(id: number, testimonialData: Partial<Testimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: number): Promise<boolean>;
  
  // Session store
  sessionStore: any;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private orders: Map<number, Order>;
  private testimonials: Map<number, Testimonial>;
  
  private userCurrentId: number;
  private productCurrentId: number;
  private orderCurrentId: number;
  private testimonialCurrentId: number;
  
  public sessionStore: any;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.orders = new Map();
    this.testimonials = new Map();
    
    this.userCurrentId = 1;
    this.productCurrentId = 1;
    this.orderCurrentId = 1;
    this.testimonialCurrentId = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // 24 hours
    });
    
    // Create initial admin user
    this.createUser({
      username: "admin",
      password: "$2b$10$G3pvqDDiBDYrlJQHCrjBqerfBBWQM9q5UyiEtyfzDwXsrrmlNRXpW", // "admin123"
      isAdmin: true
    });
    
    // Create initial products
    this.createProduct({
      name: "Battle Arena",
      description: "An advanced PVP arena with multiple combat zones and custom effects.",
      price: 25.99,
      type: "map",
      features: ["Multiple combat zones", "Custom effects", "Optimized for performance"],
      images: ["https://images.unsplash.com/photo-1533750516457-a7f992034fec"],
      createdBy: 1
    });
    
    this.createProduct({
      name: "Survival Island",
      description: "Immersive survival experience with dynamic weather and resource systems.",
      price: 19.99,
      type: "map",
      features: ["Dynamic weather", "Resource systems", "Immersive experience"],
      images: ["https://images.unsplash.com/photo-1518709766631-a6a7f45921c3"],
      createdBy: 1
    });
    
    this.createProduct({
      name: "Game Enhancement Script",
      description: "Advanced script package with multiple game-enhancing features.",
      price: 14.99,
      type: "script",
      features: ["Game-enhancing features", "Secure, tested code", "Regular updates"],
      images: ["https://images.unsplash.com/photo-1563206767-5b18f218e8de"],
      createdBy: 1
    });
    
    // Create initial testimonials
    this.createTestimonial({
      name: "GamerX42",
      role: "Map Purchaser",
      rating: 5,
      content: "The battle arena map I purchased exceeded my expectations. The quality and attention to detail are outstanding, and it's been a huge hit with my friends.",
      verified: true
    });
    
    this.createTestimonial({
      name: "BlockMaster99",
      role: "Script Purchaser",
      rating: 4.5,
      content: "The scripts I bought work flawlessly and the support team was very responsive when I had questions. Definitely recommend map.exe to anyone looking for quality Roblox content.",
      verified: true
    });
    
    this.createTestimonial({
      name: "RobloxPro2023",
      role: "Regular Customer",
      rating: 5,
      content: "I've purchased multiple maps from map.exe and each one has been superb. The transaction process is smooth and the Discord community is very helpful.",
      verified: true
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase(),
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const now = new Date();
    
    // Ensure isAdmin has a default value if not provided
    if (!('isAdmin' in insertUser)) {
      insertUser = {
        ...insertUser,
        isAdmin: false
      } as InsertUser;
    }
    
    // Add a default email if not provided
    if (!('email' in insertUser) || !insertUser.email) {
      insertUser = {
        ...insertUser,
        email: `${insertUser.username}@mapexe.com`
      } as InsertUser;
    }
    
    const user: User = { ...insertUser, id, createdAt: now };
    this.users.set(id, user);
    return user;
  }
  
  async listUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }
  
  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  async deleteUser(id: number): Promise<boolean> {
    return this.users.delete(id);
  }
  
  // Product methods
  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productCurrentId++;
    const now = new Date();
    const product: Product = { ...insertProduct, id, createdAt: now };
    this.products.set(id, product);
    return product;
  }
  
  async listProducts(type?: 'map' | 'script'): Promise<Product[]> {
    const allProducts = Array.from(this.products.values());
    if (type) {
      return allProducts.filter(product => product.type === type);
    }
    return allProducts;
  }
  
  async updateProduct(id: number, productData: Partial<Product>): Promise<Product | undefined> {
    const product = await this.getProduct(id);
    if (!product) return undefined;
    
    const updatedProduct = { ...product, ...productData };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }
  
  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }
  
  // Order methods
  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
  
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.orderCurrentId++;
    const now = new Date();
    
    // Ensure status has a default value if not provided
    if (!('status' in insertOrder) || !insertOrder.status) {
      insertOrder = {
        ...insertOrder,
        status: "pending"
      } as InsertOrder;
    }
    
    const order: Order = { ...insertOrder, id, createdAt: now };
    this.orders.set(id, order);
    return order;
  }
  
  async listOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }
  
  async updateOrder(id: number, orderData: Partial<Order>): Promise<Order | undefined> {
    const order = await this.getOrder(id);
    if (!order) return undefined;
    
    const updatedOrder = { ...order, ...orderData };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }
  
  // Testimonial methods
  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialCurrentId++;
    
    // Ensure verified has a default value if not provided
    if (!('verified' in insertTestimonial)) {
      insertTestimonial = {
        ...insertTestimonial,
        verified: false
      } as InsertTestimonial;
    }
    
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
  
  async listTestimonials(verified?: boolean): Promise<Testimonial[]> {
    const allTestimonials = Array.from(this.testimonials.values());
    if (verified !== undefined) {
      return allTestimonials.filter(testimonial => testimonial.verified === verified);
    }
    return allTestimonials;
  }
  
  async updateTestimonial(id: number, testimonialData: Partial<Testimonial>): Promise<Testimonial | undefined> {
    const testimonial = await this.getTestimonial(id);
    if (!testimonial) return undefined;
    
    const updatedTestimonial = { ...testimonial, ...testimonialData };
    this.testimonials.set(id, updatedTestimonial);
    return updatedTestimonial;
  }
  
  async deleteTestimonial(id: number): Promise<boolean> {
    return this.testimonials.delete(id);
  }
}

export class DatabaseStorage implements IStorage {
  public sessionStore: any;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // If there's no email provided but it's required, we need to handle this
    if (!('email' in insertUser) || !insertUser.email) {
      insertUser = {
        ...insertUser,
        email: `${insertUser.username}@mapexe.com` // Generate a default email
      } as InsertUser;
    }
    
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async listUsers(): Promise<User[]> {
    return db.select().from(users);
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  }

  async deleteUser(id: number): Promise<boolean> {
    const result = await db.delete(users).where(eq(users.id, id));
    return result.rowCount > 0;
  }

  // Product methods
  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products).values(insertProduct).returning();
    return product;
  }

  async listProducts(type?: 'map' | 'script'): Promise<Product[]> {
    if (type) {
      return db.select().from(products).where(eq(products.type, type));
    }
    return db.select().from(products);
  }

  async updateProduct(id: number, productData: Partial<Product>): Promise<Product | undefined> {
    const [updatedProduct] = await db
      .update(products)
      .set(productData)
      .where(eq(products.id, id))
      .returning();
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id));
    return result.rowCount > 0;
  }

  // Order methods
  async getOrder(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const [order] = await db.insert(orders).values(insertOrder).returning();
    return order;
  }

  async listOrders(): Promise<Order[]> {
    return db.select().from(orders).orderBy(desc(orders.createdAt));
  }

  async updateOrder(id: number, orderData: Partial<Order>): Promise<Order | undefined> {
    const [updatedOrder] = await db
      .update(orders)
      .set(orderData)
      .where(eq(orders.id, id))
      .returning();
    return updatedOrder;
  }

  // Testimonial methods
  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return testimonial;
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db.insert(testimonials).values(insertTestimonial).returning();
    return testimonial;
  }

  async listTestimonials(verified?: boolean): Promise<Testimonial[]> {
    if (verified !== undefined) {
      return db.select().from(testimonials).where(eq(testimonials.verified, verified));
    }
    return db.select().from(testimonials);
  }

  async updateTestimonial(id: number, testimonialData: Partial<Testimonial>): Promise<Testimonial | undefined> {
    const [updatedTestimonial] = await db
      .update(testimonials)
      .set(testimonialData)
      .where(eq(testimonials.id, id))
      .returning();
    return updatedTestimonial;
  }

  async deleteTestimonial(id: number): Promise<boolean> {
    const result = await db.delete(testimonials).where(eq(testimonials.id, id));
    return result.rowCount > 0;
  }
}

// Use the database storage
export const storage = new DatabaseStorage();
