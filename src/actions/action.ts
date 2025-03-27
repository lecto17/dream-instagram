import { User } from "@/types/user";
import { auth } from "/auth";

export const validateSession = async (): Promise<User | undefined> => {
  "use server";
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return;
  }

  return user;
};
