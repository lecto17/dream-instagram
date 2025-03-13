import { client } from "@/sanity/sanity";
import { fetchAllData, getQuery } from "@/service/fetch";
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

export const getFollowingsByUserName = async (name: string) => {
  return await client.fetch(getQuery("FOLLOWINGS", name));
};

export const getAllUser = async () => {
  return await fetchAllData("USERS");
};

export const getUserBy = async (nameOrUsername: string) => {
  return await client.fetch(getQuery("SEARCH_USER", nameOrUsername));
};
