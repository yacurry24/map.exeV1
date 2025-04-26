import { cn } from "@/lib/utils";
import logoImage from "@assets/M.png";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export function Logo({ size = "md", showText = true, className }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <div className={cn("relative flex items-center justify-center", 
                        size === "sm" ? "w-9 h-9" : 
                        size === "md" ? "w-12 h-12" : 
                        "w-16 h-16")}>
        <img 
          src={logoImage} 
          alt="map.exe Logo" 
          className="w-full h-full object-contain rounded-full p-0.5"
          style={{ background: 'transparent' }}
        />
      </div>
      
      {showText && (
        <div>
          <h1 className="font-poppins font-bold text-xl">map.exe</h1>
          <p className="text-xs text-muted-foreground">THE ALL-IN-ONE ROBLOX MAP SERVER</p>
        </div>
      )}
    </div>
  );
}
