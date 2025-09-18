import { objectMapper } from '@/utils/mapper';
import { SupaUserProfile } from '@/types/user';
import { serverSupabase } from '@/lib/supabaseServerClient';

export const getMyProfile = async (
  userId: string,
): Promise<SupaUserProfile> => {
  const client = await serverSupabase();
  const { data: profile, error } = await client
    .from('user_profiles')
    .select('*')
    .eq('id', userId);
  if (error) throw error;
  return profile.map(objectMapper)[0] as SupaUserProfile;
};

export const updateUserProfile = async (
  id: string,
  userName: string,
  avatarUrl?: string,
) => {
  const client = await serverSupabase();
  const { error } = await client
    .from('user_profiles')
    .update({
      user_name: userName,
      avatar_url: avatarUrl,
    })
    .eq('id', id);

  if (error) throw error;
};
