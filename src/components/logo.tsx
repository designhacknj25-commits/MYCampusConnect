import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="https://picsum.photos/seed/logo/100/100"
        alt="MyCampusConnect Logo"
        fill
        className="object-contain"
        data-ai-hint="logo"
      />
    </div>
  );
}
