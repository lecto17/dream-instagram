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
