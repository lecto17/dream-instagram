import { SupabaseClient } from '@supabase/supabase-js';
import { objectMapper } from '@/utils/mapper';
import { SupaUserProfile } from '@/types/user';

export const getMyProfile = async (
  client: SupabaseClient,
  userId: string,
): Promise<SupaUserProfile> => {
  const { data: profile, error } = await client
    .from('user_profiles')
    .select('*')
    .eq('id', userId);
  if (error) throw error;
  return profile.map(objectMapper)[0] as SupaUserProfile;
};
