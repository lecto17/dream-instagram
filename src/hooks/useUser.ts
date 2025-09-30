import useSWR, { useSWRConfig } from 'swr';
import {
  DetailUser,
  OnboardingUserProfile,
  SupaUserProfile,
  UserProfile,
} from '@/types/user';

export default function useUser(channelId: string) {
  const key = channelId ? `/api/me?channelId=${channelId}` : null;
  const { data: user, isLoading } = useSWR<SupaUserProfile>(key);

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

  return { user, isLoading, updateUserProfile };
}
