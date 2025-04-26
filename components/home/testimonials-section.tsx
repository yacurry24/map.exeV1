import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Testimonial } from "@shared/schema";
import { getStarRating } from "@/lib/utils";

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials", { verified: true }],
  });

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < Math.max(0, testimonials.length - 1)) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1)
  );

  return (
    <section className="py-16 bg-background">
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
            <h2 className="text-2xl font-bold px-4">What Our Users Say</h2>
            <div className="h-0.5 bg-accent-blue/30 w-12"></div>
          </motion.div>
          
          <div className="relative">
            {isLoading ? (
              <div className="flex flex-wrap gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] animate-pulse">
                    <div className="bg-card border border-border rounded-xl p-6 h-full">
                      <div className="flex items-center mb-4">
                        <div className="h-4 bg-muted rounded w-24"></div>
                      </div>
                      <div className="mb-4 space-y-2">
                        <div className="h-3 bg-muted rounded w-full"></div>
                        <div className="h-3 bg-muted rounded w-full"></div>
                        <div className="h-3 bg-muted rounded w-3/4"></div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-muted rounded-full mr-3"></div>
                        <div>
                          <div className="h-4 bg-muted rounded w-20 mb-1"></div>
                          <div className="h-3 bg-muted rounded w-16"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="flex flex-wrap gap-4">
                  {visibleTestimonials.map((testimonial, index) => {
                    const starRating = getStarRating(testimonial.rating);
                    
                    return (
                      <motion.div
                        key={testimonial.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
                      >
                        <div className="bg-card border border-border rounded-xl p-6 h-full">
                          <div className="flex items-center mb-4">
                            <div className="text-accent-purple text-xl flex">
                              {starRating.full.map((_, i) => (
                                <svg key={`full-${i}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                              ))}
                              {starRating.half.map((_, i) => (
                                <svg key={`half-${i}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                  <defs>
                                    <linearGradient id="half-gradient">
                                      <stop offset="50%" stopColor="currentColor" />
                                      <stop offset="50%" stopColor="transparent" />
                                    </linearGradient>
                                  </defs>
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="url(#half-gradient)" stroke="currentColor" strokeWidth="1" />
                                </svg>
                              ))}
                              {starRating.empty.map((_, i) => (
                                <svg key={`empty-${i}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="transparent" stroke="currentColor" strokeWidth="1">
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="text-foreground/80 mb-4">
                            "{testimonial.content}"
                          </p>
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-background rounded-full mr-3 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-medium">{testimonial.name}</h4>
                              <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                
                {testimonials.length > 3 && (
                  <div className="flex justify-between items-center absolute top-1/2 -left-4 -right-4 transform -translate-y-1/2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="hidden md:flex h-8 w-8 rounded-full bg-background"
                      onClick={handlePrev}
                      disabled={currentIndex === 0}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="hidden md:flex h-8 w-8 rounded-full bg-background"
                      onClick={handleNext}
                      disabled={currentIndex >= testimonials.length - (window.innerWidth >= 1024 ? 3 : 2)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
          
          {!isLoading && testimonials.length > 3 && (
            <div className="mt-8 flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index >= currentIndex && index < currentIndex + 3
                      ? "bg-accent-purple"
                      : "bg-muted"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                ></button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
