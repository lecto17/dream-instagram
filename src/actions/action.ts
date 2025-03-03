import { User } from "@/types/user";
import { auth } from "/auth";

export const validateSession = async (): Promise<User> => {
  "use server";
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("[Error] UnAuthorized");
  }

  return user;
};
