import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";

export function PolicyPage() {
  const [, params] = useLocation();
  const [activeTab, setActiveTab] = useState("privacy");
  
  useEffect(() => {
    // Check for URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get("tab");
    if (tabParam && ["privacy", "refund", "terms"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [params]);

  return (
    <>
      <Helmet>
        <title>Policies | map.exe</title>
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">Our Policies</h1>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
                <TabsTrigger value="refund">Refund Policy</TabsTrigger>
                <TabsTrigger value="terms">Terms of Service</TabsTrigger>
              </TabsList>
              
              <Card>
                <CardContent className="pt-6">
                  <TabsContent value="privacy" className="space-y-4">
                    <h2 className="text-2xl font-bold">Privacy Policy</h2>
                    <p className="text-sm text-muted-foreground">Last Updated: 26/04/2025</p>
                    
                    <div className="space-y-4 mt-6">
                      <p>Your privacy is important to us. This Privacy Policy explains how we handle your information.</p>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Information We Collect:</h3>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Discord usernames or IDs when you join our server.</li>
                          <li>Any information you voluntarily provide when purchasing or communicating with us.</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">How We Use Your Information:</h3>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>To deliver your purchased items (maps, scripts).</li>
                          <li>To contact you about your orders or support requests.</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Information Sharing:</h3>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>We do not sell, trade, or share your information with third parties.</li>
                          <li>We only use your information internally to provide services.</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Security:</h3>
                        <p>We take reasonable measures to protect your information but cannot guarantee complete security.</p>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Contact:</h3>
                        <p>For any questions about your data, contact us through our <a href="https://discord.gg/5rvn78hdjD" target="_blank" className="text-accent-purple hover:underline">Discord server</a>.</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="refund" className="space-y-4">
                    <h2 className="text-2xl font-bold">Refund Policy</h2>
                    <p className="text-sm text-muted-foreground">Last Updated: 26/04/2025</p>
                    
                    <div className="space-y-4 mt-6">
                      <p className="font-semibold">All sales are final.</p>
                      <p>Because we sell virtual items (Roblox maps and scripts), no refunds will be provided once:</p>
                      
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Your payment has been processed and</li>
                        <li>You have received access to your purchased item(s).</li>
                      </ul>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Why No Refunds?</h3>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Virtual items cannot be "returned" once delivered.</li>
                          <li>Once you have access to the map or script, the transaction is complete.</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Exceptions:</h3>
                        <p>If for some reason you do not receive your purchased item due to an error on our side, please contact us within 48 hours via <a href="https://discord.gg/5rvn78hdjD" target="_blank" className="text-accent-purple hover:underline">Discord</a> to resolve the issue.</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="terms" className="space-y-4">
                    <h2 className="text-2xl font-bold">Terms of Service</h2>
                    <p className="text-sm text-muted-foreground">Last Updated: 26/04/2025</p>
                    
                    <div className="space-y-4 mt-6">
                      <p>Welcome to map.exe!</p>
                      <p>By accessing or using our website and services, you agree to the following Terms of Service. If you do not agree, please do not use our services.</p>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Services Provided:</h3>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>We sell Roblox maps and scripts (exploits) via our Discord server.</li>
                          <li>All maps and scripts are reviewed manually before being priced and sold.</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Account Requirements:</h3>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>You must have a valid Discord account to purchase or interact with our services.</li>
                          <li>You are responsible for any activity under your account.</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Use of Products:</h3>
                        <p>All products are for personal use only. Redistribution, resale, or misuse is prohibited.</p>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Disclaimer:</h3>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>We are not affiliated with Roblox Corporation.</li>
                          <li>Use of scripts (exploits) is at your own risk and may violate Roblox's Terms of Service.</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Changes:</h3>
                        <p>We reserve the right to modify these Terms of Service at any time. Updates will be posted on this page.</p>
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>
              </Card>
            </Tabs>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}