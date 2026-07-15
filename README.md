# PharmaDex

> Internally named **"DrugOrPokemon"** — a retro pixel-art quiz where players decide whether a name belongs to a pharmaceutical drug or a Pokémon.

PharmaDex is a [Next.js](https://nextjs.org) app with multiple game modes, user accounts, leaderboards, achievements, and admin tooling for managing the drug/Pokémon dataset.

---

## Tech Stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router) + React 19 |
| Language | TypeScript |
| Database | PostgreSQL via [Prisma](https://www.prisma.io) ORM |
| Auth | [Better Auth](https://www.better-auth.com) — email/password + Google OAuth |
| Styling | Tailwind CSS + custom pixel-art design system |
| UI | shadcn/ui (Radix primitives) |
| Data fetching | TanStack Query |
| Validation | Zod |
| AI (admin) | OpenAI via the Vercel AI SDK |
| Hosting | Vercel |

---

## Getting Started

### 1. Prerequisites

- **Node.js 20+**
- **npm** (this repo standardizes on npm — do not use yarn/pnpm even though a lockfile may be present)
- A **PostgreSQL** database (local, or a hosted one such as [Neon](https://neon.tech))

### 2. Install

```bash
git clone <repo-url>
cd PharmaDex
npm install
```

### 3. Environment variables

Create a `.env` file in the project root:

```bash
# --- Database (required) ---
DATABASE_URL="postgresql://user:password@host:5432/pharmadex"

# --- Auth (required) ---
AUTH_SECRET="a-long-random-string"           # session signing secret (Better Auth)
NEXT_PUBLIC_APP_URL="http://localhost:3000"  # base URL used by the auth client

# --- Google OAuth (required for Google sign-in) ---
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# --- Admin bootstrap ---
ADMIN_EMAIL="you@example.com"                # account promoted to admin

# --- OpenAI (optional; only for admin AI-assisted data entry) ---
OPENAI_API_KEY=""
```

> Generate a secret with `openssl rand -base64 32`. `.env` is gitignored — never commit real secrets, and ask before overwriting an existing `.env`.

### 4. Set up the database

```bash
npx prisma generate       # generate the Prisma client (output: src/generated/prisma)
npx prisma migrate dev    # create/apply migrations against DATABASE_URL
```

### 5. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Common Commands

```bash
npm run dev            # Dev server (localhost:3000)
npm run build          # Production build (runs `prisma generate` first)
npm run start          # Serve the production build
npm run lint           # ESLint

npx prisma migrate dev # Create + apply a migration in development
npx prisma studio      # Browse/edit the DB in a GUI
npx prisma generate    # Regenerate the Prisma client after schema changes
```

---

## Project Structure

```
src/
├── app/                    # App Router
│   ├── (pages)/            # Main pages: home, quiz, results, leaderboard,
│   │                       #   achievements, quizHistory, adminPanel, ...
│   └── api/                # Route handlers: quiz, leaderboard, achievements,
│                           #   facts, admin (CRUD), ai (OpenAI helpers)
├── components/
│   ├── quiz/               # Timed, practice, and instruction components
│   ├── ui/                 # shadcn/ui components
│   ├── tables/ · forms/    # Admin tables and forms
│   └── results/            # Results display
├── lib/
│   ├── auth.ts             # Better Auth server config
│   ├── auth-client.ts      # Better Auth React client (signIn/signOut/useSession)
│   ├── db/prisma.ts        # Prisma client singleton
│   └── validation/         # Zod schemas + TS types (quiz, gameMode)
├── generated/prisma/       # Generated Prisma client (do not edit by hand)
├── hooks/                  # Custom React hooks
└── middleware.ts           # Route protection

prisma/
├── schema.prisma           # DB schema (User, Drug, Pokemon, QuizAttempt, ...)
└── migrations/             # Migration history
```

Server components are the default; client components are marked with `"use client"`.

---

## Key Concepts

### Game Modes

Defined in [`src/lib/validation/types/gameMode.ts`](src/lib/validation/types/gameMode.ts):

| Mode | Questions | Timer | Multiplier |
| --- | --- | --- | --- |
| Classic | 25 | 5s each | 1x |
| Lightning | 25 | 2s each | 1.5x |
| Time Attack | unlimited | 60s total | 1.2x |
| Blitz | 10 | 5s each | 1.3x |
| Survival | unlimited | 3 lives | 1.4x |
| Endless | unlimited | until first miss | 1.5x |
| Practice | 25 | none | 0x (no scoring) |

### Quiz Flow

1. `/quiz` (server component) pre-fetches ~100 questions in bulk so every mode can run without extra round-trips.
2. The client picks a game mode and plays; answers POST to `/api/quiz/answer`.
3. `/api/quiz/complete` finalizes the attempt and evaluates achievements.
4. Redirect to `/results/[quizAttemptId]` with the score breakdown.

### Authentication

- Better Auth is configured in [`src/lib/auth.ts`](src/lib/auth.ts) (email/password + Google).
- Client helpers (`signIn`, `signOut`, `useSession`) live in [`src/lib/auth-client.ts`](src/lib/auth-client.ts).
- [`src/middleware.ts`](src/middleware.ts) protects routes.
- Admin access is gated on `user.isAdmin` (seeded via `ADMIN_EMAIL`). Admins get `/adminPanel` for CRUD over drugs, Pokémon, and facts — with optional OpenAI-assisted data entry.

---

## Styling

**Read [STYLING_GUIDE.md](./STYLING_GUIDE.md) before making any visual changes.**

PharmaDex uses a consistent retro-gaming design system driven by CSS variables in [`src/app/globals.css`](src/app/globals.css):

- ✅ Use design-system colors (`bg-accent-red`, `bg-primary`) and the `Button` component variants
- ✅ Use `.retro-card` for cards and semantic HTML (`h1`, `h2`, `p`) for typography
- ✅ Fonts: **Press Start 2P** (headers), **VT323** (body)
- ❌ No raw hex colors, non-standard fonts, or arbitrary values in components

---

## Contributing Notes

- Do **not** add dependencies without asking first.
- When fixing bugs, prefer extending existing patterns over introducing new ones; if you must introduce a new pattern, remove the old one.
- Keep changes scoped to the task; avoid touching unrelated code.
- After editing `prisma/schema.prisma`, run `npx prisma migrate dev` and `npx prisma generate`.
- See [CLAUDE.md](./CLAUDE.md) for deeper architectural guidance.

---

## Deploy

Deployed on [Vercel](https://vercel.com). The build runs `prisma generate` automatically; make sure all environment variables above are configured in the Vercel project settings, and run `npx prisma migrate deploy` against the production database.
