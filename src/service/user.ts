import { client } from "@/sanity/sanity";
import { fetchAllData, getQuery } from "@/service/fetch";
import { User, UserProfile } from "@/types/user";

export const createUser = async ({ id, email, ...rest }: User) => {
  await client.createIfNotExists({
    _id: id,
    _type: "user",
    ...rest,
    email,
    username: email.split("@")[0],
    followers: [],
    following: [],
    bookmarks: [],
  });
};

export const findUserIdBy = async (email: string) => {
  return await client.fetch(getQuery("IS_EXISTS_EMAIL", email));
};

export const getFollowingsBy = async (email: string) => {
  return await client.fetch(getQuery("FOLLOWINGS", email));
};

export const getAllUser = async () => {
  return await fetchAllData("USERS");
};

export const getUserBy = async (nameOrUsername: string) => {
  return await client.fetch(getQuery("SEARCH_USER", nameOrUsername));
};

export const getUserAllInformation = async (
  nameOrUsername: string
): Promise<UserProfile> => {
  return await client.fetch(getQuery("USER_ALL_INFO", nameOrUsername));
};

export const getUserProfileTabInformation = async (
  username: string,
  type: string
) => {
  return await client
    .fetch(getQuery("USER_PROFILE_TAB", `${username}|${type}`))
    .then((res) => {
      if (res?.length && !res[0]) return [];
      return res;
    });
};

export const addBookMarkOnPost = async (postId: string, userId: string) => {
  return await client
    .patch(userId)
    .setIfMissing({ bookmarks: [] })
    .append("bookmarks", [
      {
        _ref: postId,
        _type: "reference",
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
};

export const removeBookMarkOnPost = async (postId: string, userId: string) => {
  return await client
    .patch(userId)
    .unset([`bookmarks[_ref=="${postId}"]`])
    .commit();
};

export const addFollowing = async (userId: string, profileUserId: string) => {
  return await client
    .transaction()
    .patch(profileUserId, (user) =>
      user
        .setIfMissing({ followers: [] })
        .append("followers", [{ _ref: userId, _type: "reference" }])
    )
    .patch(userId, (user) =>
      user
        .setIfMissing({ following: [] })
        .append("following", [{ _ref: profileUserId, _type: "reference" }])
    )
    .commit({ autoGenerateArrayKeys: true });
};

export const deleteOnFollowing = async (
  userId: string,
  profileUserId: string
) => {
  return await client
    .transaction()
    .patch(profileUserId, (user) =>
      user.unset([`followers[_ref=="${userId}"]`])
    )
    .patch(userId, (user) =>
      user.unset([`following[_ref=="${profileUserId}"]`])
    )
    .commit({ autoGenerateArrayKeys: true });
};

export const getRecommendUsers = async (exceptEmail: string) => {
  return await client.fetch(getQuery("RECOMMEND_USERS", exceptEmail));
};
