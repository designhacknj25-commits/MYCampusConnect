import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500 rounded-lg"></div>
        <svg
            className="relative w-full h-full"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
            d="M5 19.16V5.84C5 5.56 5.16 5.3 5.4 5.2L11.52 2.1C11.72 2 12.28 2 12.48 2.1L18.6 5.2C18.84 5.3 19 5.56 19 5.84V9.5M12 11V15M17 14L15 15.5M9 14L7 15.5M12 15L12 18.5M15 15.5L12 17L9 15.5M15 15.5V13M9 13V15.5M20 18.5L17.5 20L15 18.5L17.5 17L20 18.5ZM17.5 20V22M9 18.5L6.5 20L4 18.5L6.5 17L9 18.5ZM6.5 20V22M12 22V18.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            />
            <path
            d="M4.7 4.7L3 6M19.3 4.7L21 6"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            />
            <path
            d="M12 11L19 7.5L12 4L5 7.5L12 11Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            />
        </svg>
    </div>
  );
}
