import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";

export function ServicesSection() {
  return (
    <section id="services" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center justify-center mb-8"
          >
            <div className="h-0.5 bg-accent-blue/30 w-12"></div>
            <h2 className="text-2xl font-bold px-4">Our Services</h2>
            <div className="h-0.5 bg-accent-blue/30 w-12"></div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-muted-foreground mb-12 text-center"
          >
            Discover our curated selection of premium Roblox maps and scripts, all manually reviewed to ensure quality and security.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              <div className="h-48 bg-background relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 to-accent-purple/5 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-accent-purple/40">
                    <path d="M18 6H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z" />
                    <path d="M20 15H4" />
                    <path d="m8 3 4 3 4-3" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="bg-accent-purple/80 rounded-full px-3 py-1 text-sm inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" /><line x1="9" x2="9" y1="3" y2="18" /><line x1="15" x2="15" y1="6" y2="21" /></svg>
                    <span>Roblox Maps</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium mb-3">Premium Roblox Maps</h3>
                <p className="text-muted-foreground mb-4">
                  Access our exclusive collection of high-quality Roblox maps, each manually reviewed and priced based on complexity, design, and functionality.
                </p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-purple mt-1 mr-2"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Custom game environments</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-purple mt-1 mr-2"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Professionally designed layouts</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-purple mt-1 mr-2"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Optimized for performance</span>
                  </li>
                </ul>
                <Link href="/products/map">
                  <Button variant="link" className="text-accent-purple p-0 h-auto font-normal">
                    <span>Browse Maps</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              <div className="h-48 bg-background relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-accent-blue/5 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-accent-blue/40">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="bg-accent-blue/80 rounded-full px-3 py-1 text-sm inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                    <span>Roblox Scripts</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium mb-3">Advanced Roblox Scripts</h3>
                <p className="text-muted-foreground mb-4">
                  Enhance your gameplay with our collection of powerful, well-crafted Roblox scripts and exploits that expand your capabilities.
                </p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-blue mt-1 mr-2"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Game-enhancing functionality</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-blue mt-1 mr-2"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Secure, tested code</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-blue mt-1 mr-2"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Regular updates and support</span>
                  </li>
                </ul>
                <Link href="/products/script">
                  <Button variant="link" className="text-accent-blue p-0 h-auto font-normal">
                    <span>Explore Scripts</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-accent-purple/20 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-purple"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
              </div>
              <h3 className="text-xl font-medium">How It Works</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center mr-3 border border-border">
                    <span className="font-medium">1</span>
                  </div>
                  <h4 className="font-medium">Join Discord</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Connect with our community by joining the map.exe Discord server.
                </p>
              </div>
              
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center mr-3 border border-border">
                    <span className="font-medium">2</span>
                  </div>
                  <h4 className="font-medium">Browse Products</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Explore our curated selection of maps and scripts in the designated channels.
                </p>
              </div>
              
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center mr-3 border border-border">
                    <span className="font-medium">3</span>
                  </div>
                  <h4 className="font-medium">Secure Purchase</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Complete your transaction securely with our verified staff members.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
