import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 retro-button relative overflow-hidden text-white pixel-border",
  {
    variants: {
      variant: {
        default: "retro-button-red",
        destructive: "retro-button-destructive",
        outline: "retro-button-outline",
        secondary: "retro-button-secondary",
        ghost: "retro-button-ghost",
        link: "retro-button-link",
        success: "retro-button-success",
      },
      size: {
        default: "h-12 border-6 px-6 py-3 text-sm min-w-[120px]",
        sm: "h-10 px-4 border-4 py-2 text-xs min-w-[100px]",
        lg: "h-16 px-8 py-4 text-base min-w-[160px]",
        xl: "h-20 px-12 py-6 text-lg min-w-[200px]",
        icon: "h-12 w-12 p-0",
        wide: "h-14 px-16 py-4 text-base min-w-[240px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
