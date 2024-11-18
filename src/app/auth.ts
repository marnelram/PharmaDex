import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "@auth/core/adapters";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import prisma from "./lib/db/prisma.ts";

/**
 * @see https://authjs.dev/getting-started/adapters/prisma
 * @see https://authjs.dev/guides/edge-compatibility
 * @see https://www.prisma.io/docs/orm/prisma-client/deployment/edge/deploy-to-vercel
 *
 * role based authentication
 * @see https://www.youtube.com/watch?v=MNm1XhDjX1s&t=4456s
 *
 * getting userId from sessions
 * @see https://stackoverflow.com/questions/70409219/get-user-id-from-session-in-next-auth-client
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma) as Adapter,
  callbacks: {
    // https://next-auth.js.org/configuration/callbacks#jwt-callback
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = user.role;
        token.subscription = user.subscription;
        return token;
      }
      return token;
    },
    // https://next-auth.js.org/configuration/callbacks#session-callback
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
        session.user.subscription = token.subscription;
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
