import useSWR, { useSWRConfig } from "swr";
import { DetailUser } from "@/types/user";
import { useCallback } from "react";

export default function useUser() {
  const { data: user, isLoading, mutate } = useSWR<DetailUser>("/api/me");
  const { mutate: globalMutate } = useSWRConfig();

  const updateBookMark = async (postId: string, bookmark: boolean) => {
    return await fetch("/api/me", {
      method: "PUT",
      body: JSON.stringify({ postId, bookmark }),
    }).then((res) => res.json());
  };

  const setBookMarked = useCallback(
    (postId: string, bookmark: boolean) => {
      const newUser = {
        ...user!,
        bookmarks: bookmark
          ? [...(user?.bookmarks || []), postId]
          : user?.bookmarks?.filter((id) => id != postId) || [],
      };

      mutate(updateBookMark(postId, bookmark), {
        optimisticData: newUser,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [user, mutate]
  );

  const updateFollowing = async (
    profileUserId: string,
    addOnFollowing: boolean
  ) => {
    return await fetch("/api/me/following", {
      method: "PUT",
      body: JSON.stringify({ profileUserId, addOnFollowing }),
    }).then((res) => res.json());
  };

  const setFollowing = (
    profileUserId: string,
    profileUserName: string,
    addOnFollowing: boolean
  ) => {
    const newFollowings = addOnFollowing
      ? [...(user?.following || [])]
      : (user?.following?.filter(({ id }) => id !== profileUserId) ?? []);

    mutate(updateFollowing(profileUserId, addOnFollowing), {
      optimisticData: { ...user!, following: newFollowings },
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    }).then(() => globalMutate(`/api/users/${profileUserName}`));
  };

  return { user, isLoading, setBookMarked, setFollowing };
}
