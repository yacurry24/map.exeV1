import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-background bg-[size:50px_50px] bg-[image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]"></div>
      
      <div className="container mx-auto px-4 py-16 md:py-28 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center mb-2 px-3 py-1 bg-accent-purple/20 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-purple mr-2">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
            <span className="text-sm font-medium">Premium Roblox Maps & Scripts</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent">Elevate Your</span> Roblox Experience
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            map.exe provides premium, manually-reviewed Roblox maps and high-quality scripts to transform your gaming experience.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/#services">
              <Button className="w-full sm:w-auto shadow-[0_0_15px_rgba(123,58,237,0.6)] hover:shadow-[0_0_25px_rgba(123,58,237,0.8)] transition-all">
                Explore Services
              </Button>
            </Link>
            <Link href="https://discord.gg/mapexe" target="_blank">
              <Button variant="outline" className="w-full sm:w-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M10.693 9.86H5.867L7.287 5.316H12.107L10.693 9.86Z" />
                  <path d="M14.573 5.316L16.453 12.976L17.867 9.86H22.693L19.413 17.996H14.587L11.307 5.316H14.573Z" />
                  <circle cx="16.573" cy="14.516" r="0.76" />
                </svg>
                Join Our Community
              </Button>
            </Link>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 relative max-w-4xl mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/20 to-accent-blue/20 rounded-xl blur-xl"></div>
          <div className="relative bg-card border border-border rounded-xl overflow-hidden p-1">
            <div className="rounded-lg overflow-hidden h-[300px] md:h-[400px] bg-background">
              <div className="w-full h-full bg-gradient-to-br from-background via-background/90 to-background/80 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4 flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-accent-purple/60">
                      <path d="M10 2v8.5L3 18v2h18v-2l-7-7.5V2h-4Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent">
                    High-Quality Roblox Content
                  </h3>
                  <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                    Experience premium maps and scripts that elevate your Roblox gameplay
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -top-4 -left-4 bg-card border border-border rounded-lg p-2 shadow-lg">
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-accent-purple rounded-full animate-pulse"></div>
              <span>Premium Maps</span>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-lg p-2 shadow-lg">
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse"></div>
              <span>Custom Scripts</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
}
