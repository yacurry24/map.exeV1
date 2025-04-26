import { Logo } from "@/components/ui/logo";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <a href="/" className="flex items-center mb-6 md:mb-0">
              <Logo />
            </a>
            
            <div className="flex space-x-4">
              <a 
                href="https://discord.gg/5rvn78hdjD" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-background hover:bg-background/80 rounded-full flex items-center justify-center transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-background hover:bg-background/80 rounded-full flex items-center justify-center transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-background hover:bg-background/80 rounded-full flex items-center justify-center transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div>
              <h4 className="font-medium mb-3 text-sm uppercase tracking-wider text-muted-foreground">Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="text-foreground/80 hover:text-accent-purple transition-colors">Home</a></li>
                <li><a href="/#about" className="text-foreground/80 hover:text-accent-purple transition-colors">About</a></li>
                <li><a href="/#services" className="text-foreground/80 hover:text-accent-purple transition-colors">Services</a></li>
                <li><a href="/#showcase" className="text-foreground/80 hover:text-accent-purple transition-colors">Showcase</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 text-sm uppercase tracking-wider text-muted-foreground">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/products/map" className="text-foreground/80 hover:text-accent-purple transition-colors">Roblox Maps</a></li>
                <li><a href="/products/script" className="text-foreground/80 hover:text-accent-purple transition-colors">Roblox Scripts</a></li>
                <li><a href="https://discord.gg/5rvn78hdjD" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-accent-purple transition-colors">Custom Orders</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 text-sm uppercase tracking-wider text-muted-foreground">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/#faq" className="text-foreground/80 hover:text-accent-purple transition-colors">FAQ</a></li>
                <li><a href="https://discord.gg/5rvn78hdjD" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-accent-purple transition-colors">Discord Support</a></li>
                <li><a href="https://discord.gg/5rvn78hdjD" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-accent-purple transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 text-sm uppercase tracking-wider text-muted-foreground">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/policies?tab=terms" className="text-foreground/80 hover:text-accent-purple transition-colors">Terms of Service</Link></li>
                <li><Link href="/policies?tab=privacy" className="text-foreground/80 hover:text-accent-purple transition-colors">Privacy Policy</Link></li>
                <li><Link href="/policies?tab=refund" className="text-foreground/80 hover:text-accent-purple transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} map.exe. All rights reserved. Not affiliated with Roblox Corporation.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
