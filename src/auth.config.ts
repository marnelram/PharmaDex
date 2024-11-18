import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import prisma from "./app/lib/db/prisma";
import { Subscription } from "@prisma/client";

/**
 * @see https://authjs.dev/getting-started/adapters/prisma
 * @see https://authjs.dev/guides/edge-compatibility
 *
 * setting up google OAuth
 * @see https://www.youtube.com/watch?v=ot9yuKg15iA
 *
 * setting up roles
 * @see https://authjs.dev/guides/role-based-access-control#with-database
 * @see https://www.youtube.com/watch?v=MNm1XhDjX1s&t=4456s
 *
 * setting up email credentials
 * @see https://authjs.dev/getting-started/authentication/credentials
 */
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile) {
        console.log("Profile callback:", { profile });
        return {
          isAdmin: profile.isAdmin ?? false,
          subscription: profile.subscription ?? "free",
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        // logic to verify if user exists
        try {
          user = await prisma.user.findFirst({
            where: {
              email: credentials.email as string,
            },
          });
        } catch (error) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw error;
        }
        if (!user) {
          throw new Error("[DEV] No User Found");
        }

        // Ensure subscription is one of the expected types
        const validSubscriptions = ["free", "basic", "enterprise"] as const;
        const userSubscription = user.subscription.toLowerCase() as
          | "free"
          | "basic"
          | "enterprise"; // Convert to lowercase
        if (!validSubscriptions.includes(userSubscription)) {
          user.subscription = "FREE"; // or handle this case as needed
        } else {
          user.subscription = userSubscription.toUpperCase() as Subscription;
        }

        // logic to check if password is correct
        const passwordsMatch = await bcrypt.compare(
          credentials.password as string,
          user.passHash as string
        );
        if (!passwordsMatch) {
          // TODO: Add additional security measures
          // e.g. rate limiting, brute-force protection
          throw new Error("[DEV] Incorrect password");
        }

        // return user object with their user data
        return {
          ...user,
          subscription: user.subscription as "free" | "basic" | "enterprise",
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
