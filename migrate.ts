import { drizzle } from 'drizzle-orm/neon-serverless';
import { migrate } from 'drizzle-orm/neon-serverless/migrator';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import * as schema from "../shared/schema";

neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema });

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

// Generate a random password
function generateRandomPassword(): string {
  const length = 12;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

async function main() {
  console.log('Creating tables if they do not exist...');
  
  // Push the schema to the database using raw SQL
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      is_admin BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
    
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price DOUBLE PRECISION NOT NULL,
      type TEXT NOT NULL,
      features JSONB NOT NULL,
      images JSONB NOT NULL,
      created_by INTEGER NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
    
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      discord_username TEXT NOT NULL,
      discord_id TEXT NOT NULL,
      product_id INTEGER NOT NULL,
      price DOUBLE PRECISION NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
    
    CREATE TABLE IF NOT EXISTS testimonials (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      rating INTEGER NOT NULL,
      content TEXT NOT NULL,
      verified BOOLEAN NOT NULL DEFAULT FALSE
    );
  `);
  
  console.log('Tables created successfully!');
  
  // Check if admin account exists
  const existingAdminResult = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    ["ycarocontas@gmail.com"]
  );
  const existingAdmin = existingAdminResult.rows;
  
  if (existingAdmin.length === 0) {
    // Create admin account with random password
    const adminPassword = generateRandomPassword();
    const hashedPassword = await hashPassword(adminPassword);
    
    await pool.query(
      "INSERT INTO users (username, email, password, is_admin) VALUES ($1, $2, $3, $4)",
      ["ycaro", "ycarocontas@gmail.com", hashedPassword, true]
    );
    
    console.log('Admin account created successfully!');
    console.log('Username: ycaro');
    console.log(`Password: ${adminPassword}`);
    console.log('Email: ycarocontas@gmail.com');
  } else {
    console.log('Admin account already exists, skipping creation.');
  }
  
  // Add initial products if they don't exist
  const existingProductsResult = await pool.query("SELECT * FROM products");
  const existingProducts = existingProductsResult.rows;
  
  if (existingProducts.length === 0) {
    const adminUserResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      ["ycarocontas@gmail.com"]
    );
    const adminUser = adminUserResult.rows;
    
    if (adminUser.length > 0) {
      const adminId = adminUser[0].id;
      
      // Create sample products with proper JSON encoding for arrays
      await pool.query(`
        INSERT INTO products (name, description, price, type, features, images, created_by)
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7),
        ($8, $9, $10, $11, $12, $13, $14),
        ($15, $16, $17, $18, $19, $20, $21)
      `, [
        // Product 1: Battle Arena
        "Battle Arena",
        "An advanced PVP arena with multiple combat zones and custom effects.",
        25.99,
        "map",
        JSON.stringify(["Multiple combat zones", "Custom effects", "Optimized for performance"]),
        JSON.stringify(["https://images.unsplash.com/photo-1533750516457-a7f992034fec"]),
        adminId,
        
        // Product 2: Survival Island
        "Survival Island",
        "Immersive survival experience with dynamic weather and resource systems.",
        19.99,
        "map",
        JSON.stringify(["Dynamic weather", "Resource systems", "Immersive experience"]),
        JSON.stringify(["https://images.unsplash.com/photo-1518709766631-a6a7f45921c3"]),
        adminId,
        
        // Product 3: Game Enhancement Script
        "Game Enhancement Script",
        "Advanced script package with multiple game-enhancing features.",
        14.99,
        "script",
        JSON.stringify(["Game-enhancing features", "Secure, tested code", "Regular updates"]),
        JSON.stringify(["https://images.unsplash.com/photo-1563206767-5b18f218e8de"]),
        adminId
      ]);
      
      console.log('Sample products created successfully!');
    }
  } else {
    console.log('Products already exist, skipping creation.');
  }
  
  // Add initial testimonials if they don't exist
  const existingTestimonialsResult = await pool.query("SELECT * FROM testimonials");
  const existingTestimonials = existingTestimonialsResult.rows;
  
  if (existingTestimonials.length === 0) {
    // Create sample testimonials
    await pool.query(`
      INSERT INTO testimonials (name, role, rating, content, verified)
      VALUES 
      ($1, $2, $3, $4, $5),
      ($6, $7, $8, $9, $10),
      ($11, $12, $13, $14, $15)
    `, [
      // Testimonial 1
      "GamerX42",
      "Map Purchaser",
      5,
      "The battle arena map I purchased exceeded my expectations. The quality and attention to detail are outstanding, and it's been a huge hit with my friends.",
      true,
      
      // Testimonial 2
      "BlockMaster99",
      "Script Purchaser",
      4,
      "The scripts I bought work flawlessly and the support team was very responsive when I had questions. Definitely recommend map.exe to anyone looking for quality Roblox content.",
      true,
      
      // Testimonial 3
      "RobloxPro2023",
      "Regular Customer",
      5,
      "I've purchased multiple maps from map.exe and each one has been superb. The transaction process is smooth and the Discord community is very helpful.",
      true
    ]);
    
    console.log('Sample testimonials created successfully!');
  } else {
    console.log('Testimonials already exist, skipping creation.');
  }
  
  console.log('Migration completed successfully!');
  process.exit(0);
}

main().catch((error) => {
  console.error('Migration failed!', error);
  process.exit(1);
});