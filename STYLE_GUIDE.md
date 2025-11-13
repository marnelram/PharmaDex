# PharmaDex Style Guide

Quick reference for styling components in PharmaDex. Use this guide instead of creating custom styles.

## 📐 Layout & Spacing

### Container Widths
```tsx
className="max-w-2xl"  // Small cards/forms
className="max-w-4xl"  // Medium content
className="max-w-6xl"  // Wide layouts/grids
```

### Padding
```tsx
className="p-4 sm:p-6"   // Card padding (mobile → desktop)
className="px-4 py-6"    // Asymmetric padding
className="gap-4"        // Space between flex/grid items
```

### Responsive Patterns
```tsx
className="hidden sm:block"          // Show on desktop only
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
className="text-sm sm:text-base"    // Responsive text
```

## 🎨 Colors (Use CSS Variables)

### Text Colors
```tsx
className="text-foreground"         // Main text (#1a1a1a)
className="text-muted-foreground"   // Secondary text (#6b7280)
className="text-accent-red"         // Accent red (#eb4755)
className="text-accent-red-light"   // Light red (#e99d96)
className="text-accent-red-dark"    // Dark red (#bd284d)
```

### Background Colors
```tsx
className="bg-secondary/40"         // Translucent secondary
className="bg-accent-red/10"        // Light red tint
className="bg-muted"                // Light gray
```

### Borders
```tsx
className="border-2 border-accent-red/30"
className="border-b border-border"
```

## 🎴 Cards

### Standard Card
```tsx
<Card className="retro-card">
  <CardContent className="p-4 sm:p-6">
    {/* Your content */}
  </CardContent>
</Card>
```

### Info Box (inside cards)
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

## 🔘 Buttons

### Using shadcn Button Component (PREFERRED)
```tsx
import { Button } from "@/components/ui/button";

<Button variant="default" size="lg">      // Red primary
<Button variant="secondary" size="lg">    // Green/cream
<Button variant="ghost" size="sm">        // Transparent
<Button variant="destructive">            // Red danger
```

### Button with Animation
```tsx
<Button
  variant="default"
  size="lg"
  className="hover:animate-retro-pulse"
>
  Click Me
</Button>
```

## ✏️ Typography

**IMPORTANT**: Let semantic HTML handle fonts automatically!

```tsx
// ✅ GOOD - Fonts applied automatically
<h1>Big Title</h1>         // → Press Start 2P, 44px
<h2>Section Title</h2>     // → Press Start 2P, 34px
<h3>Subsection</h3>        // → Press Start 2P, 28px
<p>Body text</p>           // → VT323, 20px

// ❌ BAD - Don't add custom fonts
<h1 className="font-['Poppins']">Title</h1>  // NEVER DO THIS
```

### Text Utilities
```tsx
className="text-center"
className="font-bold"
className="font-semibold"
className="text-outline"        // Black outline (for light backgrounds)
className="text-outline-thick"  // Thicker outline
```

## 🎬 Animations

```tsx
className="animate-retro-pulse"   // Gentle scaling pulse
className="animate-retro-glow"    // Brightness glow
className="animate-retro-bounce"  // Bounce once
className="animate-retro-slide"   // Slide in from left
```

## 📏 Common Patterns

### Game Mode Card
```tsx
<Card className="retro-card hover:scale-105 transition-transform cursor-pointer border-2 hover:border-primary">
  <CardContent className="p-4">
    <div className="text-center mb-3">
      <div className="text-4xl mb-2">🎮</div>
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
      <span className="text-xl">📝</span>
      <h4 className="font-semibold">Questions</h4>
    </div>
    <p className="text-muted-foreground">25 questions</p>
  </div>
  {/* More info boxes */}
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
<Button
  variant="ghost"
  size="sm"
  onClick={() => router.push("/quiz")}
>
  <ArrowLeft className="h-4 w-4 mr-2" />
  Back
</Button>
```

## ⚠️ What NOT to Do

### ❌ Don't Create Custom Gradients
```tsx
// BAD
<div style={{background: 'linear-gradient(...)'}} />

// GOOD - Use existing classes
<Card className="retro-card">
```

### ❌ Don't Use Inline Styles
```tsx
// BAD
<div style={{padding: '20px', color: '#eb4755'}} />

// GOOD
<div className="p-4 text-accent-red" />
```

### ❌ Don't Add Custom Fonts
```tsx
// BAD
<h1 className="font-['Raleway']">Title</h1>

// GOOD - Let HTML tags handle it
<h1>Title</h1>
```

### ❌ Don't Fight !important
```tsx
// BAD - Creates specificity hell
<div className="bg-blue-500 !text-white !p-8">

// GOOD - Work with the system
<Card className="retro-card">
  <CardContent className="p-4 sm:p-6 text-foreground">
```

## 🚀 Quick Start Checklist

When adding a new feature:

1. ✅ Use `<Card className="retro-card">` for containers
2. ✅ Use `<Button variant="...">` for buttons
3. ✅ Use semantic HTML (`h1`, `h2`, `p`) for text
4. ✅ Use CSS variables for colors (`text-accent-red`)
5. ✅ Use Tailwind utilities for spacing (`p-4`, `gap-4`)
6. ✅ Add responsive breakpoints (`sm:`, `md:`, `lg:`)
7. ✅ Use existing animation classes (`animate-retro-pulse`)
8. ❌ NEVER use custom fonts or gradients

## 💡 Need Help?

If you're stuck on styling:
1. Check existing components for similar patterns
2. Look in `src/app/globals.css` for available CSS variables
3. Look in `src/app/retro-components.css` for component classes
4. Use browser DevTools to inspect existing styles

---

**Remember:** The existing design system is powerful. Use it instead of fighting it!
