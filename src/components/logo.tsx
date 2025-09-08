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
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="50%" stopColor="#c026d3" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="20" ry="20" fill="url(#logoGradient)" />
      <path
        d="M50 25 L25 40 L50 55 L75 40 Z"
        fill="white"
        transform="translate(0, 0)"
      />
      <path
        d="M78 38 L78 45 L85 41 Z"
        fill="white"
        stroke="white"
        strokeLinejoin="round"
        strokeWidth="1"
      />
      <path
        d="M20 78 C 20 65, 80 65, 80 78 V 80 C 80 90, 20 90, 20 80 Z"
        stroke="white"
        strokeWidth="4"
        fill="none"
        transform="translate(0, -10)"
      />
      <path
        d="M35 55 a 5 5 0 1 1 -10 0 a 5 5 0 1 1 10 0"
        stroke="white"
        strokeWidth="4"
        fill="none"
        transform="translate(0, 5)"
      />
      <path
        d="M75 55 a 5 5 0 1 1 -10 0 a 5 5 0 1 1 10 0"
        stroke="white"
        strokeWidth="4"
        fill="none"
        transform="translate(0, 5)"
      />
      <path
        d="M55 70 a 5 5 0 1 1 -10 0 a 5 5 0 1 1 10 0"
        stroke="white"
        strokeWidth="4"
        fill="none"
        transform="translate(0, 5)"
      />
      <path
        d="M30 60 L45 75 L65 60"
        stroke="white"
        strokeWidth="4"
        fill="none"
        transform="translate(0, 0)"
      />
    </svg>
  );
}
