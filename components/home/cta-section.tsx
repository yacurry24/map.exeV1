import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";

export function CtaSection() {
  return (
    <section id="discord" className="py-16 bg-background relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-background bg-[size:50px_50px] bg-[image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]"></div>
      
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-gradient-to-r from-accent-purple/20 to-accent-blue/20 rounded-xl p-8 border border-border"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Join Our Discord Community</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Connect with our community, browse our catalog of premium maps and scripts, and get assistance from our dedicated support team.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="w-full md:w-1/2 lg:w-2/5">
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-accent-purple/10 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-purple">
                        <path d="M9 17l6-6-6-6" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">map.exe Discord</h3>
                      <p className="text-sm text-muted-foreground">Join 5,000+ members</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-purple mt-1 mr-3">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span className="text-sm text-foreground/80">Access our catalog of premium products</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-purple mt-1 mr-3">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span className="text-sm text-foreground/80">Secure transactions with verified staff</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-purple mt-1 mr-3">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span className="text-sm text-foreground/80">Get support and assistance</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-purple mt-1 mr-3">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span className="text-sm text-foreground/80">Connect with other Roblox enthusiasts</span>
                    </li>
                  </ul>
                  
                  <a href="https://discord.gg/mapexe" target="_blank" rel="noopener noreferrer" className="block w-full">
                    <Button className="w-full shadow-[0_0_15px_rgba(123,58,237,0.6)] hover:shadow-[0_0_25px_rgba(123,58,237,0.8)] transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 12h8" />
                        <path d="M12 8v8" />
                      </svg>
                      Join Discord Server
                    </Button>
                  </a>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 lg:w-2/5 hidden md:block">
                <div className="rounded-xl border border-border shadow-xl overflow-hidden relative">
                  <div className="aspect-[4/3] bg-card w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-accent-purple/30">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
                      </svg>
                    </div>
                    <div className="relative z-10 bg-background/80 backdrop-blur-md p-6 rounded-lg text-center w-full max-w-xs mx-auto">
                      <div className="flex justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-accent-purple">
                          <path d="M9 17l6-6-6-6" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-medium mb-2">Join Today</h3>
                      <p className="text-sm text-foreground/70">
                        Our Discord community is the central hub for all map.exe services and products
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 bg-card border border-border rounded-lg p-3 max-w-xs mx-auto">
                  <div className="flex items-center text-sm">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-foreground/80">5,000+ online members</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
