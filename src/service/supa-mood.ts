import { getAuthenticatedUser } from '@/actions/action';
import { serverSupabase } from '@/lib/supabaseServerClient';

export const getMyMood = async () => {
  const user = await getAuthenticatedUser();
  if (!user) throw new Error('User not found');

  const client = await serverSupabase();
  const { data, error } = await client
    .from('moods')
    .select('*')
    .eq('user_id', user.id)
    .single();
  if (error) throw error;
  return data;
};

export const addMyMood = async (mood: string) => {
  const client = await serverSupabase();
  const { data, error } = await client.from('moods').insert({ mood });
  if (error) throw error;
  return data;
};
