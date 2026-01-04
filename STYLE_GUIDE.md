# PharmaDex Styling Guide

## Overview

PharmaDex uses a **retro-gaming aesthetic** inspired by classic 8-bit and 16-bit games. This guide ensures consistent styling across the entire application and makes it easier to add new features without breaking the visual design.

---

## Quick Reference

Use this section for fast lookups. See detailed sections below for more information.

### Layout & Spacing

```tsx
className = "max-w-2xl"; // Small cards/forms
className = "max-w-4xl"; // Medium content
className = "max-w-6xl"; // Wide layouts/grids
className = "p-4 sm:p-6"; // Card padding (mobile -> desktop)
className = "gap-4"; // Space between flex/grid items
className = "hidden sm:block"; // Show on desktop only
className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4";
```

### Colors (Always Use CSS Variables)

```tsx
className = "text-foreground"; // Main text
className = "text-muted-foreground"; // Secondary text
className = "text-accent-red"; // Accent red (#eb4755)
className = "bg-secondary/40"; // Translucent secondary
className = "bg-accent-red/10"; // Light red tint
className = "border-2 border-accent-red/30";
```

### Cards & Buttons

```tsx
<Card className="retro-card">
  <CardContent className="p-4 sm:p-6">
    <Button variant="default" size="lg">
      Red Primary
    </Button>
    <Button variant="secondary">Green/Cream</Button>
    <Button variant="ghost">Transparent</Button>
  </CardContent>
</Card>
```

### Typography (Use Semantic HTML)

```tsx
<h1>Big Title</h1>     // Press Start 2P, 44px
<h2>Section</h2>       // Press Start 2P, 34px
<h3>Subsection</h3>    // Press Start 2P, 28px
<p>Body text</p>       // VT323, 20px
// NEVER add custom fonts like font-['Poppins']
```

### Animations

```tsx
className = "animate-retro-pulse"; // Gentle scaling pulse
className = "animate-retro-glow"; // Brightness glow
className = "animate-retro-bounce"; // Bounce once
className = "animate-retro-slide"; // Slide in from left
```

---

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Component Classes](#component-classes)
5. [Animations](#animations)
6. [Best Practices](#best-practices)
7. [Common Patterns](#common-patterns)
8. [Anti-Patterns (What NOT to Do)](#anti-patterns-what-not-to-do)

---

## Technology Stack

- **Tailwind CSS v3.4.1** - Utility-first CSS framework
- **Custom CSS Components** - Retro-styled components in `globals.css`
- **Class Variance Authority (CVA)** - For managing component variants
- **Radix UI** - Unstyled component primitives
- **tailwindcss-animate** - Animation utilities
- **tailwindcss-textshadow** - Text shadow utilities

---

## Color System

### Primary Colors

Use CSS variables or Tailwind utilities. **NEVER use hex values directly in components.**

```tsx
// CORRECT - Use CSS variables
<div className="bg-accent-red text-primary">

// CORRECT - Use Tailwind utilities with color names
<div className="bg-primary text-foreground">

// WRONG - Direct hex values
<div className="bg-[#E63946] text-[#F5F5F5]">
```

### Available Colors

#### Brand Colors

- `accent-red` - Main brand color (#eb4755)

  - `accent-red-dark` - Darker variant (#bd284d)
  - `accent-red-light` - Lighter variant (#e99d96)

- `primary` - Light green background (#d9e2cf)

  - `primary-light` - Lighter variant (#e7e9e2)
  - `primary-dark` - Darker variant (#afbea7)

- `secondary` - Blue accent (#4c99e6)
  - `secondary-dark` - Darker variant (#2e5cb8)
  - `secondary-light` - Lighter variant (#99cce6)

#### System Colors

- `background` - Main background color
- `foreground` - Main text color
- `card` - Card background
- `card-foreground` - Card text color
- `border` - Border color
- `muted` - Muted background (#f5f5f5)
- `muted-foreground` - Muted text color
- `destructive` - Error/danger color
- `success` - Success color
- `input` - Input background

### Tailwind Usage

```tsx
// Background colors
<div className="bg-accent-red">
<div className="bg-primary">
<div className="bg-secondary">
<div className="bg-muted">

// Text colors
<span className="text-accent-red">
<span className="text-foreground">
<span className="text-muted-foreground">

// Border colors
<div className="border border-border">
```

---

## Typography

### Fonts

**Only use the two official fonts:**

1. **Press Start 2P** - For headers (h1-h5)
2. **VT323** - For body text, paragraphs, labels, and spans

**DO NOT use Poppins, Raleway, or any other fonts.** These are automatically applied through the base layer in `globals.css`.

### Font Sizes

Headers automatically get correct font sizes and families:

```tsx
// CORRECT - Use semantic HTML
<h1>PharmaDex</h1>           // 44px (28px mobile)
<h2>Quiz Results</h2>         // 34px (24px mobile)
<h3>Section Title</h3>        // 28px (18px mobile)
<h4>Subsection</h4>           // 22px (14px mobile)
<h5>Small Header</h5>         // 18px (10px mobile)

<p>Body text here</p>          // 20px (16px mobile)
<label>Input Label</label>     // 16px (14px mobile)

// WRONG - Don't override with font-['Poppins'] or font-['Raleway']
<h1 className="font-['Poppins']">Wrong Font</h1>
```

### Text Shadows

Headers automatically include retro-style text shadows. Additional utilities:

```tsx
<span className="text-outline">Black outline</span>
<span className="text-outline-thick">Thick black outline</span>
<span className="text-outline-white">White outline</span>
```

---

## Component Classes

### Buttons

**PREFERRED: Use the shadcn Button component:**

```tsx
import { Button } from "@/components/ui/button";

<Button variant="default" size="lg">      // Red primary
<Button variant="secondary" size="lg">    // Green/cream
<Button variant="ghost" size="sm">        // Transparent
<Button variant="destructive">            // Red danger

// With animation
<Button
  variant="default"
  size="lg"
  className="hover:animate-retro-pulse"
>
  Click Me
</Button>
```

**Alternative: Use `.retro-button` base class with variant modifiers:**

```tsx
// Primary button (red)
<button className="retro-button retro-button-red">Click Me</button>

// Secondary button (green/cream)
<button className="retro-button retro-button-secondary">Cancel</button>

// Success button (green)
<button className="retro-button retro-button-success">Confirm</button>

// Outline button (transparent with border)
<button className="retro-button retro-button-outline">Outline</button>

// Ghost button (minimal styling)
<button className="retro-button retro-button-ghost">Ghost</button>
```

**Button features:**

- 3D gradient effect with inset shadows
- 6px borders for solid variants, 3px for outline
- 12px border-radius
- Automatic hover and active states
- VT323 font with text shadow

### Cards

Use `.retro-card` for card containers:

```tsx
<Card className="retro-card">
  <CardContent className="p-4 sm:p-6">{/* Your content */}</CardContent>
</Card>
```

**Card features:**

- 3D gradient border effect (blue tones)
- 6px solid border
- 16px border-radius
- Inset shadows for depth
- White background

### Info Boxes (inside cards)

```tsx
<div className="bg-secondary/40 p-4 rounded-lg pixel-border">
  <h4 className="font-semibold mb-2">Title</h4>
  <p className="text-muted-foreground">Content</p>
</div>
```

### Highlight Box

```tsx
<div className="bg-accent-red/10 border-2 border-accent-red/30 p-4 rounded-lg">
  <h3 className="font-bold mb-3">Important Info</h3>
  <p>Content</p>
</div>
```

### Borders

For custom bordered elements:

```tsx
<div className="pixel-border">Content with pixelated border</div>
```

### Images

For pixel art or retro images:

```tsx
<img src="/sprite.png" className="pixel-perfect" alt="Retro sprite" />
```

This prevents blurring on scaled pixel art.

---

## Animations

All animations respect `prefers-reduced-motion` for accessibility.

### Available Animations

```tsx
// Bounce animation (1s)
<div className="animate-retro-bounce">Bounces once</div>

// Glow animation (infinite, step-based)
<div className="animate-retro-glow">Glowing effect</div>

// Pulse animation (infinite, smooth scale)
<div className="animate-retro-pulse">Pulsing scale</div>

// Shake animation (0.5s)
<div className="animate-retro-shake">Shakes horizontally</div>

// Slide-in animation (0.5s)
<div className="animate-retro-slide">Slides in from left</div>

// Fade-in animation (0.3s)
<div className="animate-pixel-fade">Fades in with scale</div>

// Shimmer effect (single animation)
<div className="animate-shimmer">Shimmer overlay</div>
```

### When to Use Animations

- **Bounce**: Completed achievements, success states
- **Glow**: Active or highlighted elements
- **Pulse**: Loading indicators, attention-grabbing elements
- **Shake**: Error states, invalid input
- **Slide**: Page transitions, modal entries
- **Fade**: Content appearing, tooltips
- **Shimmer**: Loading states, hover effects on cards

---

## Best Practices

### 1. Always Use Design System Colors

```tsx
// CORRECT
<div className="bg-accent-red text-primary">
<div className="bg-secondary-light border-border">

// WRONG
<div className="bg-[#E63946] text-[#F5F5F5]">
<div className="bg-blue-400 border-black">
```

### 2. Use CSS Variable Radius

```tsx
// CORRECT - Uses --radius variable (16px)
<div className="rounded-lg">         // var(--radius)
<div className="rounded-md">         // var(--radius) - 2px
<div className="rounded-sm">         // var(--radius) - 4px

// WRONG - Hardcoded values
<div className="rounded-[15px]">
<div className="rounded-[25px]">
```

### 3. Consistent Spacing

Use Tailwind's default spacing scale (4px base unit):

```tsx
// CORRECT - Consistent spacing
<div className="p-4 gap-4">         // 16px
<div className="p-6 gap-6">         // 24px
<div className="p-8 gap-8">         // 32px

// WRONG - Random spacing
<div className="p-[17px] gap-[23px]">
```

### 4. Semantic HTML

Use proper HTML elements for better accessibility:

```tsx
// CORRECT
<button className="retro-button retro-button-red">Click</button>
<h1>Page Title</h1>

// WRONG
<div className="retro-button retro-button-red">Click</div>
<div className="text-4xl font-bold">Page Title</div>
```

### 5. Mobile-First Responsive Design

```tsx
// CORRECT - Mobile first, then larger screens
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
<h1 className="text-2xl md:text-4xl">Title</h1>

// Use responsive utilities
<div className="p-4 md:p-6 lg:p-8">
```

---

## Common Patterns

### Page Container

```tsx
<div className="min-h-screen flex flex-col items-center justify-start p-8">
  <div className="retro-card w-full max-w-4xl p-6">{/* Page content */}</div>
</div>
```

### Game Mode Card

```tsx
<Card className="retro-card hover:scale-105 transition-transform cursor-pointer border-2 hover:border-primary">
  <CardContent className="p-4">
    <div className="text-center mb-3">
      <div className="text-4xl mb-2">icon</div>
      <h3 className="font-bold text-lg">Mode Name</h3>
    </div>
    <p className="text-sm text-muted-foreground text-center mb-4">
      Description
    </p>
    <Button variant="default" size="sm" className="w-full">
      Select
    </Button>
  </CardContent>
</Card>
```

### Two-Column Info Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="bg-secondary/40 p-4 rounded-lg pixel-border">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-xl">icon</span>
      <h4 className="font-semibold">Questions</h4>
    </div>
    <p className="text-muted-foreground">25 questions</p>
  </div>
  {/* More info boxes */}
</div>
```

### Button Group

```tsx
<div className="flex gap-4 justify-center">
  <Button variant="default">Confirm</Button>
  <Button variant="secondary">Cancel</Button>
</div>
```

### Card Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item) => (
    <Card key={item.id} className="retro-card">
      <CardContent className="p-4">{/* Card content */}</CardContent>
    </Card>
  ))}
</div>
```

### Scrollable Container

```tsx
<div className="w-full max-w-4xl px-4 py-6 overflow-y-auto max-h-[85vh]">
  {/* Content */}
</div>
```

### Back Button

```tsx
<Button variant="ghost" size="sm" onClick={() => router.push("/quiz")}>
  <ArrowLeft className="h-4 w-4 mr-2" />
  Back
</Button>
```

### Form Input

```tsx
<div className="space-y-2">
  <label htmlFor="input" className="block">
    Label Text
  </label>
  <input
    id="input"
    type="text"
    className="w-full px-4 py-2 border-4 border-foreground rounded-lg bg-input"
  />
</div>
```

### Loading State

```tsx
<div className="flex items-center justify-center p-8">
  <div className="animate-retro-pulse text-accent-red">Loading...</div>
</div>
```

---

## Anti-Patterns (What NOT to Do)

### Don't Use Hex Colors Directly

```tsx
// WRONG
<div className="bg-[#E63946]">
<span style={{ color: '#F5F5F5' }}>

// CORRECT
<div className="bg-accent-red">
<span className="text-muted">
```

### Don't Use Non-Standard Fonts

```tsx
// WRONG
<h1 className="font-['Poppins']">Title</h1>
<p className="font-['Raleway']">Text</p>

// CORRECT - Fonts are automatic
<h1>Title</h1>  {/* Press Start 2P */}
<p>Text</p>     {/* VT323 */}
```

### Don't Create Custom Gradients

```tsx
// WRONG
<div style={{background: 'linear-gradient(...)'}} />

// CORRECT - Use existing classes
<Card className="retro-card">
```

### Don't Use Inline Styles

```tsx
// WRONG
<div style={{padding: '20px', color: '#eb4755'}} />

// CORRECT
<div className="p-4 text-accent-red" />
```

### Don't Use Incorrect Tailwind Syntax

```tsx
// WRONG - Missing brackets
<div className="bg-F5F5F5/20">
<div className="text-E63946/50">

// CORRECT
<div className="bg-muted/20">
<div className="bg-accent-red/50">
```

### Don't Use Arbitrary Rounded Values

```tsx
// WRONG
<div className="rounded-[15px]">
<div className="rounded-[25px]">

// CORRECT
<div className="rounded-lg">   {/* Uses --radius = 16px */}
<div className="rounded-md">   {/* 14px */}
<div className="rounded-sm">   {/* 12px */}
```

### Don't Mix Styling Approaches

```tsx
// WRONG - Mixing inline styles with classes
<div
  className="retro-card"
  style={{ backgroundColor: '#ffffff', padding: '20px' }}
>

// CORRECT - Use only Tailwind utilities
<div className="retro-card bg-card p-5">
```

### Don't Override Retro Component Styles

```tsx
// WRONG - Fighting with retro styles
<button className="retro-button retro-button-red rounded-none border-0">

// CORRECT - Use appropriate variant or create new component
<button className="retro-button retro-button-outline">
```

### Don't Use Generic Tailwind Colors

```tsx
// WRONG - Breaks design system
<div className="bg-blue-400 text-red-500">
<div className="bg-green-600 border-yellow-300">

// CORRECT - Use design system colors
<div className="bg-secondary text-accent-red">
<div className="bg-success border-accent-red">
```

### Don't Fight !important

```tsx
// WRONG - Creates specificity hell
<div className="bg-blue-500 !text-white !p-8">

// CORRECT - Work with the system
<Card className="retro-card">
  <CardContent className="p-4 sm:p-6 text-foreground">
```

---

## Component Reference

### UI Components Location

All reusable UI components are in `/src/components/ui/`:

- `button.tsx` - Button component with CVA variants
- `card.tsx` - Card, CardHeader, CardContent, CardTitle, CardDescription
- `badge.tsx` - Badge component for tags and labels
- `input.tsx` - Form input component
- `progress.tsx` - Progress bar component
- `dialog.tsx` - Modal dialog component
- `scroll-area.tsx` - Custom scrollbar component
- And more...

### Using UI Components

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// These components already have retro styling applied
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    <Button variant="default">Click Me</Button>
    <Badge variant="pokemon">Pokemon</Badge>
  </CardContent>
</Card>;
```

---

## File Organization

### Current Structure

```
/src/
├── app/
│   ├── globals.css          // All custom CSS and Tailwind config
│   ├── layout.tsx           // Imports globals.css
│   └── (pages)/             // All page components
│
├── components/
│   ├── ui/                  // Reusable UI components
│   ├── quiz/                // Quiz-specific components
│   ├── results/             // Results-specific components
│   ├── forms/               // Form components
│   └── tables/              // Table components
│
└── lib/
    └── utils.ts             // cn() helper for className composition
```

### Key Files

- **`globals.css`** - All custom styling, CSS variables, retro components, animations
- **`tailwind.config.ts`** - Tailwind configuration, color extensions, animations
- **`utils.ts`** - `cn()` function for merging class names with tailwind-merge

---

## Quick Start Checklist

When adding a new feature:

1. Use `<Card className="retro-card">` for containers
2. Use `<Button variant="...">` for buttons
3. Use semantic HTML (`h1`, `h2`, `p`) for text
4. Use CSS variables for colors (`text-accent-red`)
5. Use Tailwind utilities for spacing (`p-4`, `gap-4`)
6. Add responsive breakpoints (`sm:`, `md:`, `lg:`)
7. Use existing animation classes (`animate-retro-pulse`)
8. NEVER use custom fonts or gradients

---

## Getting Help

### Quick Reference

**Need a color?** -> Use `bg-accent-red`, `bg-primary`, `bg-secondary`, or `bg-muted`
**Need a button?** -> Use `<Button variant="...">` or `retro-button` with variant class
**Need a card?** -> Use `retro-card`
**Need an animation?** -> Use `animate-retro-*` classes
**Need spacing?** -> Use Tailwind scale: `p-4`, `gap-4`, `m-4`
**Need border radius?** -> Use `rounded-lg/md/sm`

### Common Questions

**Q: Can I use my own colors?**
A: No. Always use the design system colors to maintain consistency.

**Q: Can I use different fonts?**
A: No. Only Press Start 2P (headers) and VT323 (body) maintain the retro aesthetic.

**Q: Can I create custom button styles?**
A: Use existing Button variants or retro-button variants. If you need a new variant, add it to the component.

**Q: What about dark mode?**
A: Dark mode is supported via CSS variables. All colors automatically adapt.

---

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives)
- [Class Variance Authority](https://cva.style/docs)

---

**Last Updated:** 2025-12-26
