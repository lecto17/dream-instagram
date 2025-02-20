import { createUser } from "@/service/user";
import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import Google from "next-auth/providers/google";

const providers: Provider[] = [Google];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { handlers, signIn, auth } = NextAuth({
  providers,
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn({ user: { email, name, ...rest } }) {
      if (!email) return false;

      await createUser({ id: rest.id || "", email, name: name || "", ...rest });

      return true;
    },
    async session({ session, user }) {
      console.log("session: ", session, user);
      return session;
    },
  },
});
