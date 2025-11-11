# PharmaDex

PharmaDex is an interactive quiz application with a retro-gaming aesthetic that helps users learn about pharmaceuticals and Pokémon through engaging quizzes.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load custom fonts.

## Styling Guide

**IMPORTANT:** Before making any styling changes, please read the [STYLING_GUIDE.md](./STYLING_GUIDE.md) document.

PharmaDex uses a consistent retro-gaming design system with:
- **Tailwind CSS** for utility-first styling
- **Custom retro components** for buttons, cards, and UI elements
- **Consistent color system** using CSS variables
- **Typography system** with Press Start 2P and VT323 fonts

Key styling principles:
- ✅ Always use design system colors (e.g., `bg-accent-red`, `bg-primary`)
- ✅ Use semantic HTML for proper typography
- ✅ Use `rounded-lg/md/sm` for border-radius
- ❌ Never use hex colors directly in components
- ❌ Never use non-standard fonts (Poppins, Raleway, etc.)
- ❌ Never use arbitrary values for common properties

For detailed guidelines, examples, and best practices, see [STYLING_GUIDE.md](./STYLING_GUIDE.md).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
