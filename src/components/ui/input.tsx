import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full bg-[var(--primary-light)] border-[6px] border-[#1a1a1a] text-[var(--foreground)] px-4 py-2 text-base font-medium font-['VT323'] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2)] transition-all duration-150 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[var(--foreground)] placeholder:text-[var(--foreground)]/60 focus-visible:outline-none focus-visible:border-[var(--accent-red)] disabled:cursor-not-allowed disabled:opacity-50 rounded-lg pixel-border",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
