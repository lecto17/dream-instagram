import useSWR, { useSWRConfig } from 'swr';
import {
  DetailUser,
  OnboardingUserProfile,
  SupaUserProfile,
  UserProfile,
} from '@/types/user';

export default function useUser(channelId: string) {
  // const { data: user, isLoading, mutate } = useSWR<DetailUser>("/api/me");
  const { data: user, isLoading } = useSWR<SupaUserProfile>(
    `/api/me?channelId=${channelId}`,
  );
  // const { mutate: globalMutate } = useSWRConfig();

  const updateUserProfile = async (data: Omit<OnboardingUserProfile, 'id'>) => {
    const formData = new FormData();
    formData.append('userName', data.userName);
    if (data.avatarFile) {
      formData.append('avatarFile', data.avatarFile as File);
    }

    return await fetch(`/api/me?channelId=${channelId}`, {
      method: 'PUT',
      body: formData,
    }).then((res) => res.json());
  };

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

  // return { user, isLoading, setBookMarked, setFollowing, updateUserProfile };
  return { user, isLoading, updateUserProfile };
}
