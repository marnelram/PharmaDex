import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design System Colors
        "accent-red": {
          DEFAULT: "var(--accent-red)",
          dark: "var(--accent-red-dark)",
          light: "var(--accent-red-light)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          dark: "var(--primary-dark)",
          light: "var(--primary-light)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          dark: "var(--secondary-dark)",
          light: "var(--secondary-light)",
        },

        // System Colors
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        border: "var(--border)",
        input: "hsl(var(--input))",
        ring: "var(--ring)",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        // Original glow animations
        glow: {
          "0%, 100%": {
            textShadow: "0 0 4px #ff0000, 0 0 11px #ff0000, 0 0 19px #ff0000",
          },
          "50%": {
            textShadow: "0 0 8px #ff0000, 0 0 22px #ff0000, 0 0 38px #ff0000",
          },
        },
        "glow-large": {
          "0%, 100%": {
            textShadow: "0 0 8px #ff0000, 0 0 22px #ff0000, 0 0 38px #ff0000",
          },
          "50%": {
            textShadow: "0 0 16px #ff0000, 0 0 44px #ff0000, 0 0 76px #ff0000",
          },
        },

        // Retro animations from globals.css
        shimmer: {
          "0%": {
            backgroundPosition: "-200% 0",
          },
          "100%": {
            backgroundPosition: "200% 0",
          },
        },
        "retro-bounce": {
          "0%, 20%, 53%, 80%, 100%": {
            transform: "translate3d(0, 0, 0)",
          },
          "40%, 43%": {
            transform: "translate3d(0, -8px, 0)",
          },
          "70%": {
            transform: "translate3d(0, -4px, 0)",
          },
          "90%": {
            transform: "translate3d(0, -2px, 0)",
          },
        },
        "retro-glow": {
          "0%": {
            filter: "brightness(1) contrast(1.2)",
          },
          "25%": {
            filter: "brightness(1.2) contrast(1.4)",
          },
          "50%": {
            filter: "brightness(1.3) contrast(1.5)",
          },
          "75%": {
            filter: "brightness(1.2) contrast(1.4)",
          },
          "100%": {
            filter: "brightness(1) contrast(1.2)",
          },
        },
        "retro-pulse": {
          "0%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.05)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        "retro-shake": {
          "0%, 100%": {
            transform: "translateX(0)",
          },
          "10%, 30%, 50%, 70%, 90%": {
            transform: "translateX(-2px)",
          },
          "20%, 40%, 60%, 80%": {
            transform: "translateX(2px)",
          },
        },
        "retro-slide": {
          "0%": {
            transform: "translateX(-100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        "pixel-fade": {
          "0%": {
            opacity: "0",
            transform: "scale(0.8)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },
      animation: {
        // Original animations
        glow: "glow 2s ease-in-out infinite",
        "glow-large": "glow-large 2s ease-in-out infinite",

        // Retro animations
        shimmer: "shimmer 1.5s ease-in-out infinite",
        "retro-bounce": "retro-bounce 1s ease-in-out",
        "retro-glow": "retro-glow 1.5s steps(8) infinite",
        "retro-pulse": "retro-pulse 2s ease-in-out infinite",
        "retro-shake": "retro-shake 0.5s ease-in-out",
        "retro-slide": "retro-slide 0.5s ease-out",
        "pixel-fade": "pixel-fade 0.3s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
