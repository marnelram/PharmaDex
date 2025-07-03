import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full border-[4px] border-solid border-t-[#FFFFFF] border-l-[#FFFFFF] border-r-[#9E9E9E] border-b-[#757575] bg-gradient-to-b from-[#FFFFFF] to-[#F5F5F5] px-4 py-2 text-base font-medium text-[#2D2D2D] shadow-[inset_2px_2px_0_rgba(255,255,255,0.4),inset_-2px_-2px_0_rgba(0,0,0,0.2)] transition-all duration-150 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[#757575] focus-visible:outline-none focus-visible:shadow-[inset_2px_2px_0_rgba(255,255,255,0.4),inset_-2px_-2px_0_rgba(0,0,0,0.3),0_0_0_2px_#E63946] disabled:cursor-not-allowed disabled:opacity-50 rounded-lg pixel-border",
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
