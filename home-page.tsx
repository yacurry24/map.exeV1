import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { AboutSection } from "@/components/home/about-section";
import { ServicesSection } from "@/components/home/services-section";
import { ShowcaseSection } from "@/components/home/showcase-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FaqSection } from "@/components/home/faq-section";
import { CtaSection } from "@/components/home/cta-section";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function HomePage() {
  const [location] = useLocation();

  // Handle smooth scrolling to hash links
  useEffect(() => {
    if (location.includes("#")) {
      const id = location.split("#")[1];
      const element = document.getElementById(id);
      if (element) {
        // Add a slight delay to ensure all components are rendered
        setTimeout(() => {
          window.scrollTo({
            top: element.offsetTop - 80, // Account for header height
            behavior: "smooth",
          });
        }, 100);
      }
    } else {
      // Scroll to top when navigating to the home page without a hash
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ShowcaseSection />
        <TestimonialsSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
