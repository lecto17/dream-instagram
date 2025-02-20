import { client } from "@/sanity/sanity";
import { User } from "@/types/user";

export const createUser = async ({ id, email, ...rest }: User) => {
  await client.createIfNotExists({
    _id: id,
    _type: "user",
    ...rest,
    username: email.split("@")[0],
    followers: [],
    following: [],
    bookmarks: [],
  });
};
