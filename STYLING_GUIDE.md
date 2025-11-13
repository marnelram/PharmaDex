# PharmaDex Styling Guide

## Overview

PharmaDex uses a **retro-gaming aesthetic** inspired by classic 8-bit and 16-bit games. This guide ensures consistent styling across the entire application and makes it easier to add new features without breaking the visual design.

---

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Component Classes](#component-classes)
5. [Animations](#animations)
6. [Spacing & Layout](#spacing--layout)
7. [Best Practices](#best-practices)
8. [Common Patterns](#common-patterns)
9. [Anti-Patterns (What NOT to Do)](#anti-patterns-what-not-to-do)

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
// ✅ CORRECT - Use CSS variables
<div className="bg-accent-red text-primary">

// ✅ CORRECT - Use Tailwind utilities with color names
<div className="bg-primary text-foreground">

// ❌ WRONG - Direct hex values
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
// ✅ CORRECT - Use semantic HTML
<h1>PharmaDex</h1>           // 44px (28px mobile)
<h2>Quiz Results</h2>         // 34px (24px mobile)
<h3>Section Title</h3>        // 28px (18px mobile)
<h4>Subsection</h4>           // 22px (14px mobile)
<h5>Small Header</h5>         // 18px (10px mobile)

<p>Body text here</p>          // 20px (16px mobile)
<label>Input Label</label>     // 16px (14px mobile)

// ❌ WRONG - Don't override with font-['Poppins'] or font-['Raleway']
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

Use the `.retro-button` base class with variant modifiers:

```tsx
// Primary button (red)
<button className="retro-button retro-button-red">
  Click Me
</button>

// Secondary button (green/cream)
<button className="retro-button retro-button-secondary">
  Cancel
</button>

// Success button (green)
<button className="retro-button retro-button-success">
  Confirm
</button>

// Destructive button (red danger)
<button className="retro-button retro-button-destructive">
  Delete
</button>

// Outline button (transparent with border)
<button className="retro-button retro-button-outline">
  Outline
</button>

// Ghost button (minimal styling)
<button className="retro-button retro-button-ghost">
  Ghost
</button>

// Link button (looks like a link)
<button className="retro-button retro-button-link">
  Link Style
</button>
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
<div className="retro-card p-6">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>
```

**Card features:**
- 3D gradient border effect (blue tones)
- 6px solid border
- 16px border-radius
- Inset shadows for depth
- White background

### Borders

For custom bordered elements:

```tsx
<div className="pixel-border">
  Content with pixelated border
</div>
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

## Spacing & Layout

### Responsive Spacing Principles

Always use responsive spacing that adapts to mobile and desktop viewports. This prevents overflow issues and improves the user experience across all devices.

### Mobile-First Spacing

Use smaller spacing on mobile and larger spacing on desktop:

```tsx
// ✅ CORRECT - Responsive spacing
<div className="p-4 sm:p-8">           // 16px mobile, 32px desktop
<div className="gap-3 sm:gap-4">       // 12px mobile, 16px desktop
<div className="space-y-3 sm:space-y-4">

// ❌ WRONG - Fixed large spacing causes mobile overflow
<div className="p-8">                  // Too much padding on mobile
<div className="gap-8">                // Too much gap on mobile
<div className="space-y-8">            // Too much vertical spacing
```

### Spacing Scale

Use Tailwind's default spacing scale (4px base unit) with responsive modifiers:

- **Tight spacing**: `gap-2 sm:gap-3` (8px → 12px)
- **Normal spacing**: `gap-3 sm:gap-4` (12px → 16px)
- **Comfortable spacing**: `gap-4 sm:gap-6` (16px → 24px)
- **Spacious**: `gap-6 sm:gap-8` (24px → 32px)

### Preventing Overflow

To prevent content overflow, especially with headers:

```tsx
// ✅ CORRECT - Content fits within viewport
<Card className="max-h-[calc(100dvh-120px)] sm:max-h-[calc(100dvh-100px)] flex flex-col">
  <CardContent className="overflow-y-auto">
    {/* Scrollable content */}
  </CardContent>
</Card>

// ✅ CORRECT - Responsive padding on pages
<div className="p-4 sm:p-8">

// ❌ WRONG - Fixed height without accounting for header
<Card className="h-screen">
  {/* Content will overflow */}
</Card>

// ❌ WRONG - Large padding on mobile
<div className="p-8">  {/* Use p-4 sm:p-8 instead */}
```

### Height Calculations

When accounting for the fixed header:

```tsx
// Mobile: Header is ~130px
// Desktop: Header is ~92px

// ✅ CORRECT - Account for header height
<div className="h-[calc(100dvh-130px)] sm:h-[calc(100dvh-92px)]">

// For cards with max-height
<Card className="max-h-[calc(100dvh-120px)] sm:max-h-[calc(100dvh-100px)]">
```

### ScrollArea Usage

For content that may overflow, use ScrollArea component:

```tsx
// ✅ CORRECT - ScrollArea with calculated height
<ScrollArea className="h-[calc(100dvh-200px)] sm:h-[calc(100dvh-180px)]">
  <div className="space-y-4">
    {/* Content */}
  </div>
</ScrollArea>

// ✅ CORRECT - Fixed height ScrollArea
<ScrollArea className="h-[70vh]">
  {/* Content */}
</ScrollArea>
```

### Icon and Button Sizing

Use responsive sizing for interactive elements:

```tsx
// ✅ CORRECT - Responsive icon sizing
<ChevronLeft className="size-6 sm:size-8" />

// ✅ CORRECT - Responsive button spacing
<div className="flex gap-3 sm:gap-4">
  <Button>Click</Button>
  <Button>Cancel</Button>
</div>
```

### Common Spacing Patterns

**Page Containers:**
```tsx
<div className="min-h-screen p-4 sm:p-8">
  {/* Page content */}
</div>
```

**Card Headers:**
```tsx
<CardHeader className="p-3 sm:p-4">
  {/* Header content */}
</CardHeader>
```

**Card Content:**
```tsx
<CardContent className="p-4 sm:p-6">
  {/* Content */}
</CardContent>
```

**Element Gaps:**
```tsx
<div className="flex flex-col gap-3 sm:gap-4">
  {/* Elements with vertical spacing */}
</div>
```

### Spacing Anti-Patterns

```tsx
// ❌ WRONG - Too much vertical spacing on mobile
<div className="space-y-8">          // Use space-y-3 sm:space-y-4
<div className="gap-8">               // Use gap-3 sm:gap-4

// ❌ WRONG - Large padding causes overflow
<CardContent className="p-8">        // Use p-4 sm:p-6

// ❌ WRONG - Fixed large gaps
<div className="flex gap-6">          // Use gap-3 sm:gap-4

// ❌ WRONG - Not accounting for header
<div className="h-screen">            // Use h-[calc(100dvh-120px)] sm:h-[calc(100dvh-100px)]
```

---

## Best Practices

### 1. Always Use Design System Colors

```tsx
// ✅ CORRECT
<div className="bg-accent-red text-primary">
<div className="bg-secondary-light border-border">

// ❌ WRONG
<div className="bg-[#E63946] text-[#F5F5F5]">
<div className="bg-blue-400 border-black">
```

### 2. Use CSS Variable Radius

```tsx
// ✅ CORRECT - Uses --radius variable (16px)
<div className="rounded-lg">         // var(--radius)
<div className="rounded-md">         // var(--radius) - 2px
<div className="rounded-sm">         // var(--radius) - 4px

// ❌ WRONG - Hardcoded values
<div className="rounded-[15px]">
<div className="rounded-[25px]">
```

### 3. Consistent Spacing

Use Tailwind's default spacing scale (4px base unit):

```tsx
// ✅ CORRECT - Consistent spacing
<div className="p-4 gap-4">         // 16px
<div className="p-6 gap-6">         // 24px
<div className="p-8 gap-8">         // 32px

// ❌ WRONG - Random spacing
<div className="p-[17px] gap-[23px]">
```

### 4. Semantic HTML

Use proper HTML elements for better accessibility:

```tsx
// ✅ CORRECT
<button className="retro-button retro-button-red">Click</button>
<h1>Page Title</h1>

// ❌ WRONG
<div className="retro-button retro-button-red">Click</div>
<div className="text-4xl font-bold">Page Title</div>
```

### 5. Mobile-First Responsive Design

```tsx
// ✅ CORRECT - Mobile first, then larger screens
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
  <div className="retro-card w-full max-w-4xl p-6">
    {/* Page content */}
  </div>
</div>
```

### Button Group

```tsx
<div className="flex gap-4 justify-center">
  <button className="retro-button retro-button-red">Confirm</button>
  <button className="retro-button retro-button-secondary">Cancel</button>
</div>
```

### Card Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <div key={item.id} className="retro-card p-4">
      {/* Card content */}
    </div>
  ))}
</div>
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
  <div className="animate-retro-pulse text-accent-red">
    Loading...
  </div>
</div>
```

---

## Anti-Patterns (What NOT to Do)

### ❌ Don't Use Hex Colors Directly

```tsx
// ❌ WRONG
<div className="bg-[#E63946]">
<span style={{ color: '#F5F5F5' }}>

// ✅ CORRECT
<div className="bg-accent-red">
<span className="text-muted">
```

### ❌ Don't Use Non-Standard Fonts

```tsx
// ❌ WRONG
<h1 className="font-['Poppins']">Title</h1>
<p className="font-['Raleway']">Text</p>

// ✅ CORRECT - Fonts are automatic
<h1>Title</h1>  {/* Press Start 2P */}
<p>Text</p>     {/* VT323 */}
```

### ❌ Don't Use Incorrect Tailwind Syntax

```tsx
// ❌ WRONG - Missing brackets
<div className="bg-F5F5F5/20">
<div className="text-E63946/50">

// ✅ CORRECT
<div className="bg-muted/20">
<div className="bg-accent-red/50">
```

### ❌ Don't Use Arbitrary Rounded Values

```tsx
// ❌ WRONG
<div className="rounded-[15px]">
<div className="rounded-[25px]">

// ✅ CORRECT
<div className="rounded-lg">   {/* Uses --radius = 16px */}
<div className="rounded-md">   {/* 14px */}
<div className="rounded-sm">   {/* 12px */}
```

### ❌ Don't Mix Styling Approaches

```tsx
// ❌ WRONG - Mixing inline styles with classes
<div
  className="retro-card"
  style={{ backgroundColor: '#ffffff', padding: '20px' }}
>

// ✅ CORRECT - Use only Tailwind utilities
<div className="retro-card bg-card p-5">
```

### ❌ Don't Override Retro Component Styles

```tsx
// ❌ WRONG - Fighting with retro styles
<button className="retro-button retro-button-red rounded-none border-0">

// ✅ CORRECT - Use appropriate variant or create new component
<button className="retro-button retro-button-outline">
```

### ❌ Don't Use Generic Tailwind Colors

```tsx
// ❌ WRONG - Breaks design system
<div className="bg-blue-400 text-red-500">
<div className="bg-green-600 border-yellow-300">

// ✅ CORRECT - Use design system colors
<div className="bg-secondary text-accent-red">
<div className="bg-success border-accent-red">
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
- And 17 more...

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
    <Badge variant="pokemon">Pokémon</Badge>
  </CardContent>
</Card>
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
│   ├── ui/                  // Reusable UI components (24 files)
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

## Migration Checklist

When updating existing components or creating new ones:

**Colors & Styles:**
- [ ] Replace all hex color values with design system colors
- [ ] Remove `font-['Poppins']` and `font-['Raleway']` - use semantic HTML
- [ ] Fix incorrect Tailwind syntax (e.g., `bg-F5F5F5/20` → `bg-muted/20`)
- [ ] Replace arbitrary border-radius with `rounded-lg/md/sm`
- [ ] Use `retro-button` classes instead of custom button styling
- [ ] Use `retro-card` for card containers
- [ ] Ensure animations use provided animation classes

**Spacing & Layout:**
- [ ] Use responsive spacing (`p-4 sm:p-8` instead of `p-8`)
- [ ] Use responsive gaps (`gap-3 sm:gap-4` instead of `gap-8`)
- [ ] Use responsive icon sizes (`size-6 sm:size-8`)
- [ ] Account for header height in full-height components
- [ ] Add overflow-y-auto to scrollable content areas
- [ ] Use max-height with calc() for cards that may overflow

**Testing:**
- [ ] Test on mobile (responsiveness and spacing)
- [ ] Test content overflow scenarios
- [ ] Verify accessibility (semantic HTML, ARIA labels)
- [ ] Check ScrollArea behavior on different content lengths

---

## Getting Help

### Quick Reference

**Need a color?** → Use `bg-accent-red`, `bg-primary`, `bg-secondary`, or `bg-muted`
**Need a button?** → Use `retro-button` with variant class
**Need a card?** → Use `retro-card`
**Need an animation?** → Use `animate-retro-*` classes
**Need spacing?** → Use Tailwind scale: `p-4`, `gap-4`, `m-4`
**Need border radius?** → Use `rounded-lg/md/sm`

### Common Questions

**Q: Can I use my own colors?**
A: No. Always use the design system colors to maintain consistency.

**Q: Can I use different fonts?**
A: No. Only Press Start 2P (headers) and VT323 (body) maintain the retro aesthetic.

**Q: Can I create custom button styles?**
A: Use existing retro-button variants. If you need a new variant, discuss with the team first.

**Q: What about dark mode?**
A: Dark mode is supported via CSS variables. All colors automatically adapt.

---

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives)
- [Class Variance Authority](https://cva.style/docs)

---

**Last Updated:** 2025-11-11
**Version:** 1.0.0
