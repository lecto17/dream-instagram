import useSWR from 'swr';
// import { DetailUser, SupaUserProfile, UserProfile } from '@/types/user';
import { SupaUserProfile } from '@/types/user';
// import { useCallback } from 'react';

export default function useUser() {
  // const { data: user, isLoading, mutate } = useSWR<DetailUser>("/api/me");
  const { data: user, isLoading } = useSWR<SupaUserProfile>('/api/me');
  // const { mutate: globalMutate } = useSWRConfig();

  // const updateBookMark = async (postId: string, bookmark: boolean) => {
  //   return await fetch('/api/me', {
  //     method: 'PUT',
  //     body: JSON.stringify({ postId, bookmark }),
  //   }).then((res) => res.json());
  // };

  // const setBookMarked = useCallback(
  //   (postId: string, bookmark: boolean) => {
  //     const newUser = {
  //       ...user!,
  //       bookmarks: bookmark
  //         ? [...(user?.bookmarks || []), postId]
  //         : user?.bookmarks?.filter((id) => id != postId) || [],
  //     };

  //     mutate(updateBookMark(postId, bookmark), {
  //       optimisticData: newUser,
  //       populateCache: false,
  //       revalidate: false,
  //       rollbackOnError: true,
  //     });
  //   },
  //   [user, mutate],
  // );

  // const updateFollowing = async (
  //   profileUserId: string,
  //   addOnFollowing: boolean,
  // ) => {
  //   return fetch('/api/me/following', {
  //     method: 'PUT',
  //     body: JSON.stringify({ profileUserId, addOnFollowing }),
  //   }).then((res) => res.json());
  // };

  // const setFollowing = useCallback(
  //   async (
  //     profileUserName: string,
  //     profileUserId: string,
  //     addOnFollowing: boolean,
  //   ) => {
  //     await updateFollowing(profileUserId, addOnFollowing).then(async () => {
  //       await Promise.all([
  //         mutate(
  //           {
  //             ...user!,
  //             following: user?.following?.length
  //               ? [
  //                   ...user.following,
  //                   { username: profileUserName, id: profileUserId },
  //                 ]
  //               : [{ username: profileUserName, id: profileUserId }],
  //           },
  //           { revalidate: true },
  //         ),
  //         globalMutate(`/api/users/${profileUserName}`),
  //       ]);
  //       // await mutate();
  //       // await globalMutate(`/api/users/${profileUserName}`);
  //     });
  //   },
  //   [user, mutate, globalMutate],
  // );

  // return { user, isLoading, setBookMarked, setFollowing };
  return { user, isLoading };
}
