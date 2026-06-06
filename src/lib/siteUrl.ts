/**
 * Resolves the public base URL of the site across environments.
 *
 * Preference order:
 * 1. NEXT_PUBLIC_SITE_URL  - explicit canonical URL (set this in production)
 * 2. VERCEL_URL            - automatically provided on Vercel deployments
 * 3. NEXTAUTH_URL          - falls back to the auth base URL
 * 4. http://localhost:3000 - local development default
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return stripTrailingSlash(explicit);

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  if (process.env.NEXTAUTH_URL) {
    return stripTrailingSlash(process.env.NEXTAUTH_URL);
  }

  return "http://localhost:3000";
}

function stripTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}
