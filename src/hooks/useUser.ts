import useSWR from "swr";
import { DetailUser } from "@/types/user";
import { useCallback } from "react";

export default function useUser() {
  const { data: user, isLoading, mutate } = useSWR<DetailUser>("/api/me");

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
  // const setFollowing = (postId: string, bookmark: boolean) => {};

  return { user, isLoading, setBookMarked };
}
