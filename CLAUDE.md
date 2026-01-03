# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PharmaDex (internally named "DrugOrPokemon") is a Next.js quiz application that challenges users to distinguish between pharmaceutical drug names and Pokémon names. The app features multiple game modes, user authentication, leaderboards, achievements, and a retro pixel-art UI inspired by classic Pokémon games.

## Tech Stack

- **Framework**: Next.js 15 (App Router) with React 19
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5 (beta) with Google OAuth and Credentials providers
- **Styling**: Tailwind CSS with custom pixel-art design system
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: TanStack Query (React Query)
- **Validation**: Zod schemas
- **Deployment**: Vercel

## Common Commands

### Development
```bash
npm run dev                    # Start development server at localhost:3000
npm run build                  # Build production bundle (includes Prisma generation)
npm run start                  # Start production server
npm run lint                   # Run ESLint
```

### Database
```bash
npx prisma generate            # Generate Prisma Client
npx prisma migrate dev         # Create and apply migrations in development
npx prisma migrate deploy      # Apply migrations in production
npx prisma studio              # Open Prisma Studio GUI
npx prisma db seed             # Seed database
npm run copy-prod-data         # Copy production data to development (uses ts-node)
```

## Project Architecture

### Directory Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (pages)/                  # Route group for main pages
│   │   ├── page.tsx              # Home page with game mode selection
│   │   ├── quiz/page.tsx         # Quiz page (server component)
│   │   ├── results/[id]/         # Quiz results page
│   │   ├── practice/[id]/        # Practice mode results
│   │   ├── leaderboard/          # Global leaderboard
│   │   ├── achievements/         # User achievements
│   │   ├── quizHistory/          # User quiz history
│   │   └── adminPanel/           # Admin panel for data management
│   ├── api/                      # API routes
│   │   ├── quiz/                 # Quiz creation and completion
│   │   ├── quiz/answer/          # Answer submission
│   │   ├── leaderboard/          # Leaderboard data
│   │   ├── achievements/         # Achievement tracking
│   │   ├── facts/                # Fun facts retrieval
│   │   ├── admin/                # Admin CRUD operations
│   │   └── ai/                   # AI-powered drug/Pokémon addition
│   ├── auth/                     # Auth pages
│   ├── settings/                 # User settings
│   ├── globals.css               # Global styles with pixel-art design system
│   ├── layout.tsx                # Root layout
│   └── providers.tsx             # Client providers (QueryClient, Theme)
├── components/
│   ├── quiz/                     # Quiz components (timed, practice, instructions)
│   ├── ui/                       # shadcn/ui components
│   ├── tables/                   # Admin panel tables
│   ├── forms/                    # Form components
│   ├── home.tsx                  # Home page component
│   ├── leaderboard.tsx           # Leaderboard component
│   └── results/                  # Results display components
├── lib/
│   ├── db/prisma.ts              # Prisma client singleton
│   ├── validation/               # Zod schemas and TypeScript types
│   │   ├── types/                # TypeScript type definitions
│   │   │   ├── quiz.ts           # Quiz types
│   │   │   └── gameMode.ts       # Game mode configs
│   │   └── zod/                  # Zod validation schemas
│   └── utils.ts                  # Utility functions (cn, etc.)
├── hooks/                        # Custom React hooks
├── auth.config.ts                # NextAuth configuration
├── auth.ts                       # NextAuth instance
└── middleware.ts                 # NextAuth middleware
```

### Database Schema

Key models in `prisma/schema.prisma`:

- **User**: User accounts with OAuth and credentials authentication
- **Drug**: Pharmaceutical drugs with name, generic name, dosage form, class, generation
- **Pokemon**: Pokémon with name, types, generation
- **QuizAttempt**: Quiz sessions with game mode, score, completion status
- **Answer**: Individual question answers linked to quiz attempts
- **Achievement**: Predefined achievements
- **UserAchievement**: User progress on achievements
- **Badge**: Collectible badges
- **UserBadge**: User badge progress
- **Stats**: Detailed user statistics (streaks, fastest quiz, etc.)
- **Fact**: Fun facts about drugs and Pokémon

### Game Modes

Defined in `src/lib/validation/types/gameMode.ts`:

- **Classic**: 25 questions, 5 seconds per question, 1x multiplier
- **Lightning**: 25 questions, 2 seconds per question, 1.5x multiplier
- **Time Attack**: Unlimited questions in 60 seconds, 1.2x multiplier
- **Blitz**: 10 questions, 5 seconds each, 1.3x multiplier
- **Survival**: Unlimited questions, 3 lives, 1.4x multiplier
- **Endless**: Unlimited questions until first mistake, 1.5x multiplier
- **Practice**: 25 questions, no timer, 0x multiplier (no scoring)

### Authentication Flow

1. NextAuth v5 is configured in `auth.config.ts` with Google OAuth and Credentials providers
2. Middleware in `src/middleware.ts` protects routes
3. Session available via `auth()` in server components or `useSession()` in client components
4. User roles: Regular users and admins (checked via `user.isAdmin`)

### Quiz Flow

1. **Initialization** (`/quiz`): Server component fetches 100 questions via internal API call
2. **Game Mode Selection**: Client component shows game mode options
3. **Quiz Play**: Questions displayed with timer (if applicable), answers submitted to `/api/quiz/answer`
4. **Completion**: Quiz completed via `/api/quiz/complete`, checks for achievements
5. **Results**: Redirect to `/results/[quizAttemptId]` with score breakdown

### Styling System

All design tokens are defined in `src/app/globals.css`:

- **Colors**: CSS variables (`--accent-red`, `--primary`, `--secondary`)
- **Typography**: Press Start 2P for headers, VT323 for body text
- **Components**: Use `.retro-card` class for cards, Button component for buttons
- **Animations**: `.animate-retro-*` classes for pixel-art animations
- **Utilities**: `.pixel-perfect` for images, `.pixel-border` for borders

Always use existing CSS classes and Button component variants instead of custom styling.

## Coding Guidelines

### Package Management
- **DO NOT** install packages without asking the user first
- Use npm (not yarn or pnpm)

### Code Quality
- Focus only on code relevant to the task
- Avoid touching unrelated code
- Keep functions under 200-300 lines; refactor if exceeding
- Prefer simple solutions over complex ones
- Check for existing similar code before duplicating logic
- Keep codebase clean and organized

### Environment Handling
- Write code that works across dev, test, and prod environments
- Never mock data for dev or prod (only for tests)
- Never overwrite `.env` without asking first

### Pattern Consistency
- When fixing bugs, exhaust all options with existing implementation before introducing new patterns
- If introducing new patterns, remove old implementation to avoid duplication
- Avoid major architectural changes to features that work well unless explicitly instructed

### Testing
- Write thorough tests for all major functionality

### UI Development
- Use semantic HTML tags (`h1`, `h2`, `p`) for automatic styling
- Use Button component with variants instead of custom button styles
- Apply `.retro-card` for card containers
- Reference CSS variables (`var(--accent-red)`) instead of hardcoded colors
- Use animation classes (`.animate-retro-pulse`, etc.)
- Test with `.pixel-perfect` class for images

## Admin Panel

Located at `/adminPanel`, requires admin authentication. Provides CRUD operations for:
- Drugs (with AI-assisted addition via OpenAI)
- Pokémon (with AI-assisted addition via OpenAI)
- Facts

## AI Integration

The app uses OpenAI (via Vercel AI SDK) to help admins add new drugs and Pokémon:
- `/api/ai/addDrug`: Generates drug data from user input
- `/api/ai/addPokemon`: Generates Pokémon data from user input

## Important Notes

- Database uses PostgreSQL (not MongoDB, despite references in tech-stack.mdc)
- Prisma client is a singleton in `src/lib/db/prisma.ts`
- NextAuth session available throughout the app
- All pages use server components by default; client components marked with `"use client"`
- Quiz questions are pre-fetched in bulk (100) to support all game modes efficiently
