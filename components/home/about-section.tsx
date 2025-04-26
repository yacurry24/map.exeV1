import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "purple" | "blue";
  delay: number;
}

function FeatureCard({ icon, title, description, color, delay }: FeatureCardProps) {
  const colorClasses = {
    purple: "bg-accent-purple/20 text-accent-purple",
    blue: "bg-accent-blue/20 text-accent-blue",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      <div className={`w-12 h-12 rounded-full ${colorClasses[color]} flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center justify-center mb-8"
          >
            <div className="h-0.5 bg-accent-purple/30 w-12"></div>
            <h2 className="text-2xl font-bold px-4">About map.exe</h2>
            <div className="h-0.5 bg-accent-purple/30 w-12"></div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-muted-foreground mb-8 text-center"
          >
            We are the premier destination for high-quality Roblox maps and scripts. Our team of experts ensures that every product meets our strict quality standards.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-xl"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>}
              title="Trusted Quality"
              description="Every map and script is meticulously reviewed before being made available to our customers."
              color="purple"
              delay={0.2}
            />
            
            <FeatureCard
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-xl"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>}
              title="Secure Transactions"
              description="Your purchases are securely processed through our Discord server with verified staff members."
              color="blue"
              delay={0.3}
            />
            
            <FeatureCard
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-xl"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>}
              title="Dedicated Support"
              description="Our community admins provide swift support to ensure your experience with map.exe is seamless."
              color="purple"
              delay={0.4}
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 bg-background border border-border rounded-xl p-6"
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-6 md:w-1/3">
                <div className="h-48 bg-accent-purple/5 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-accent-purple/60">
                    <path d="M15 12c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-.199.02-.393.057-.581" />
                    <path d="M9.243 14.828a6 6 0 1 0 5.657-10.828 6 6 0 0 0-5.657 10.828z" />
                    <path d="M12 3v1" />
                    <path d="M3 12h1" />
                    <path d="M12 20v1" />
                    <path d="M20 12h1" />
                    <path d="M18.364 5.636l-.707.707" />
                    <path d="M6.343 17.657l-.707.707" />
                    <path d="M5.636 5.636l.707.707" />
                    <path d="M17.657 17.657l.707.707" />
                  </svg>
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-medium mb-3">Our Mission</h3>
                <p className="text-foreground/80 mb-4">
                  At map.exe, we're passionate about enhancing the Roblox experience for players and developers alike. We believe in providing access to premium, high-quality maps and scripts that elevate gameplay and creative possibilities.
                </p>
                <p className="text-foreground/80">
                  Our team consists of experienced Roblox enthusiasts who understand what makes a great gaming experience. By maintaining strict quality standards and a secure marketplace, we've created a trusted platform for the Roblox community.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
