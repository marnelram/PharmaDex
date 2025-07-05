import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border-[3px] border-solid px-3 py-1 text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg pixel-border",
  {
    variants: {
      variant: {
        default:
          "border-t-[#FFB3B3] border-l-[#FFB3B3] border-r-[#B02833] border-b-[#8B1E2B] bg-gradient-to-b from-[#FF6B6B] to-[#E63946] text-white shadow-[inset_1px_1px_0_rgba(255,255,255,0.4),inset_-1px_-1px_0_rgba(0,0,0,0.3)]",
        secondary:
          "border-t-[#FFFF99] border-l-[#FFFF99] border-r-[#D4C94D] border-b-[#B8A73A] bg-gradient-to-b from-[#FFF066] to-[#F3E260] text-[#2D2D2D] shadow-[inset_1px_1px_0_rgba(255,255,255,0.4),inset_-1px_-1px_0_rgba(0,0,0,0.2)]",
        destructive:
          "border-t-[#FF8888] border-l-[#FF8888] border-r-[#991B1B] border-b-[#7F1D1D] bg-gradient-to-b from-[#FF4444] to-[#DC2626] text-white shadow-[inset_1px_1px_0_rgba(255,255,255,0.4),inset_-1px_-1px_0_rgba(0,0,0,0.3)]",
        outline:
          "border-t-[#FFFFFF] border-l-[#FFFFFF] border-r-[#9E9E9E] border-b-[#757575] bg-gradient-to-b from-[#FFFFFF] to-[#F5F5F5] text-[#2D2D2D] shadow-[inset_1px_1px_0_rgba(255,255,255,0.4),inset_-1px_-1px_0_rgba(0,0,0,0.2)]",
        success:
          "border-t-[#7FFF7F] border-l-[#7FFF7F] border-r-[#1F5F3F] border-b-[#154A2F] bg-gradient-to-b from-[#4AE54A] to-[#2E8B57] text-white shadow-[inset_1px_1px_0_rgba(255,255,255,0.4),inset_-1px_-1px_0_rgba(0,0,0,0.3)]",
        pokemon:
          "border-t-[#87CEEB] border-l-[#87CEEB] border-r-[#1565C0] border-b-[#0F4C8C] bg-gradient-to-b from-[#4DD0FF] to-[#1E90FF] text-white shadow-[inset_1px_1px_0_rgba(255,255,255,0.4),inset_-1px_-1px_0_rgba(0,0,0,0.3)]",
        drug: "border-t-[#DDD6FE] border-l-[#DDD6FE] border-r-[#6A4C93] border-b-[#553C7B] bg-gradient-to-b from-[#B794F6] to-[#9370DB] text-white shadow-[inset_1px_1px_0_rgba(255,255,255,0.4),inset_-1px_-1px_0_rgba(0,0,0,0.3)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
