import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 retro-button border-0 relative overflow-hidden rounded-none text-[#F5F5F5]",
  {
    variants: {
      variant: {
        default:
          "bg-[#E63946] border-[#B02833] shadow-[0_4px_0_#B02833,0_6px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_5px_0_#B02833,0_7px_10px_rgba(0,0,0,0.4)] hover:translate-y-[-1px] active:shadow-[0_2px_0_#B02833,0_3px_4px_rgba(0,0,0,0.3)] active:translate-y-[1px] border-b-[4px] border-r-[2px] border-solid border-l-[2px] border-t-[2px]",
        destructive:
          "bg-[#DC2626] border-[#991B1B] shadow-[0_4px_0_#991B1B,0_6px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_5px_0_#991B1B,0_7px_10px_rgba(0,0,0,0.4)] hover:translate-y-[-1px] active:shadow-[0_2px_0_#991B1B,0_3px_4px_rgba(0,0,0,0.3)] active:translate-y-[1px] border-b-[4px] border-r-[2px] border-solid border-l-[2px] border-t-[2px]",
        outline:
          "bg-[#F5F5F5] border-[#9E9E9E] text-[#2D2D2D] shadow-[0_4px_0_#9E9E9E,0_6px_8px_rgba(0,0,0,0.2)] hover:bg-[#F3E260] hover:shadow-[0_5px_0_#9E9E9E,0_7px_10px_rgba(0,0,0,0.3)] hover:translate-y-[-1px] active:shadow-[0_2px_0_#9E9E9E,0_3px_4px_rgba(0,0,0,0.2)] active:translate-y-[1px] border-b-[4px] border-r-[2px] border-solid border-l-[2px] border-t-[2px]",
        secondary:
          "bg-[#F3E260] border-[#D4C94D] text-[#2D2D2D] shadow-[0_4px_0_#D4C94D,0_6px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_5px_0_#D4C94D,0_7px_10px_rgba(0,0,0,0.3)] hover:translate-y-[-1px] active:shadow-[0_2px_0_#D4C94D,0_3px_4px_rgba(0,0,0,0.2)] active:translate-y-[1px] border-b-[4px] border-r-[2px] border-solid border-l-[2px] border-t-[2px]",
        ghost:
          "bg-transparent text-[#2D2D2D] hover:bg-[#F3E260]/80 hover:text-[#2D2D2D] shadow-none border-none",
        link: "bg-transparent text-[#E63946] underline-offset-4 hover:underline shadow-none border-none",
        success:
          "bg-[#2E8B57] border-[#1F5F3F] shadow-[0_4px_0_#1F5F3F,0_6px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_5px_0_#1F5F3F,0_7px_10px_rgba(0,0,0,0.4)] hover:translate-y-[-1px] active:shadow-[0_2px_0_#1F5F3F,0_3px_4px_rgba(0,0,0,0.3)] active:translate-y-[1px] border-b-[4px] border-r-[2px] border-solid border-l-[2px] border-t-[2px]",
        pokemon:
          "bg-[#1E90FF] border-[#1565C0] shadow-[0_4px_0_#1565C0,0_6px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_5px_0_#1565C0,0_7px_10px_rgba(0,0,0,0.4)] hover:translate-y-[-1px] active:shadow-[0_2px_0_#1565C0,0_3px_4px_rgba(0,0,0,0.3)] active:translate-y-[1px] border-b-[4px] border-r-[2px] border-solid border-l-[2px] border-t-[2px]",
        drug: "bg-[#9370DB] border-[#6A4C93] shadow-[0_4px_0_#6A4C93,0_6px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_5px_0_#6A4C93,0_7px_10px_rgba(0,0,0,0.4)] hover:translate-y-[-1px] active:shadow-[0_2px_0_#6A4C93,0_3px_4px_rgba(0,0,0,0.3)] active:translate-y-[1px] border-b-[4px] border-r-[2px] border-solid border-l-[2px] border-t-[2px]",
      },
      size: {
        default: "h-12 px-6 py-3 text-sm min-w-[120px]",
        sm: "h-10 px-4 py-2 text-xs min-w-[100px]",
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
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
