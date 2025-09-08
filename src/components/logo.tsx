import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={cn("w-full h-auto", className)}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="CampusConnect Logo"
      role="img"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#4f46e5' }} />
          <stop offset="50%" style={{ stopColor: '#c026d3' }} />
          <stop offset="100%" style={{ stopColor: '#f97316' }} />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="20" ry="20" fill="url(#logoGradient)" />
      <path
        d="M50 20 L20 35 L50 50 L80 35 Z M25 38 L25 60 L50 75 L50 53 Z"
        fill="white"
        transform="translate(0, -5)"
      />
       <path 
        d="M75 55 a 5 5 0 1 1 -10 0 a 5 5 0 1 1 10 0"
        stroke="white"
        strokeWidth="4"
        fill="none"
      />
       <path 
        d="M35 55 a 5 5 0 1 1 -10 0 a 5 5 0 1 1 10 0"
        stroke="white"
        strokeWidth="4"
        fill="none"
      />
       <path 
        d="M55 70 a 5 5 0 1 1 -10 0 a 5 5 0 1 1 10 0"
        stroke="white"
        strokeWidth="4"
        fill="none"
      />
      <path
        d="M30 55 L45 70 L60 55"
        stroke="white"
        strokeWidth="4"
        fill="none"
      />
      <path
        d="M20 60 C 20 50, 80 50, 80 60 L 80 75 C 80 85, 20 85, 20 75 Z"
        stroke="white"
        strokeWidth="4"
        fill="none"
      />
       <path 
        d="M78 33 L78 40 L85 36 Z"
        fill="white"
        stroke="white"
        strokeLinejoin="round"
        strokeWidth="1"
      />
    </svg>
  );
}