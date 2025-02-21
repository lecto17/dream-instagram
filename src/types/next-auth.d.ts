import { User } from "@/types/user";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
