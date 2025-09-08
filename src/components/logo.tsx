import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={cn("w-full h-auto", className)}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="MyCampusConnect Logo"
      role="img"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8A2BE2" />
          <stop offset="100%" stopColor="#4169E1" />
        </linearGradient>
      </defs>
      
      {/* Background */}
      <rect width="100" height="100" rx="20" ry="20" fill="url(#logoGradient)" />

      {/* Book Icon */}
      <path 
        d="M 25 75 Q 20 50, 50 40 Q 80 50, 75 75"
        stroke="white"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 50 41 V 75"
        stroke="white"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
       <path
        d="M 25 75 H 75"
        stroke="white"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      {/* Graduation Cap */}
       <path 
        d="M 15 45 L 50 30 L 85 45 L 50 60 Z"
        fill="white"
        transform="translate(0, -10)"
      />
      <path
        d="M 70 42 L 70 52 L 75 49 Z"
        fill="white"
        stroke="white"
        strokeLinejoin="round"
        strokeWidth="1"
         transform="translate(5, -10)"
      />
    </svg>
  );
}
