import { useState } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I purchase a map or script?",
    answer: "To purchase a map or script, join our Discord server and navigate to the appropriate channels. Browse the available products, and when you find something you like, contact one of our verified staff members to complete the purchase securely."
  },
  {
    question: "Are the maps and scripts safe to use?",
    answer: "Yes, all of our maps and scripts undergo rigorous testing and quality assurance. Each product is manually reviewed by our team to ensure it meets our high standards for security and performance before being made available to customers."
  },
  {
    question: "How are map prices determined?",
    answer: "Map prices are determined based on several factors including complexity, size, unique features, design quality, and the amount of custom scripting involved. Each map is individually evaluated by our team to ensure fair pricing that reflects its value."
  },
  {
    question: "Do you offer support after purchase?",
    answer: "Absolutely! We provide post-purchase support for all our products. If you encounter any issues or have questions about your purchase, you can reach out to our support team on Discord for assistance."
  }
];

export function FaqSection() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  return (
    <section id="faq" className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center justify-center mb-8"
          >
            <div className="h-0.5 bg-accent-purple/30 w-12"></div>
            <h2 className="text-2xl font-bold px-4">Frequently Asked Questions</h2>
            <div className="h-0.5 bg-accent-purple/30 w-12"></div>
          </motion.div>
          
          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <AccordionItem value={`item-${index}`} className="bg-background border border-border rounded-xl overflow-hidden mb-4">
                    <AccordionTrigger className="px-6 py-4 hover:bg-card/50 transition-colors text-left font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 py-4 border-t border-border">
                      <p className="text-muted-foreground">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
