import type { DefaultUser } from "next-auth";

/**
 * stack overflow articles for role based access controls
 * @see https://stackoverflow.com/questions/70409219/get-user-id-from-session-in-next-auth-client
 * @see https://stackoverflow.com/questions/74425533/property-role-does-not-exist-on-type-user-adapteruser-in-nextauth
 */
declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
      isAdmin: boolean;
    };
  }

  interface User extends DefaultUser {
    id: string;
    isAdmin: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    isAdmin: boolean;
  }
}
