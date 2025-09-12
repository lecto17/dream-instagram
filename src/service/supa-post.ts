import { supaPost } from '@/types/post';
import { objectMapper } from '@/utils/mapper';
import { SupabaseClient } from '@supabase/supabase-js';
import { serverSupabase } from '@/lib/supabaseServerClient';

export const getPosts = async (client: SupabaseClient) => {
  const { data, error } = await client.from('posts').select('*');

  if (error) throw error;

  const transformedData = data?.map(objectMapper);
  return transformedData;
};

export const addPost = async (post: supaPost) => {
  const client = await serverSupabase();
  const { data, error } = await client
    .from('posts')
    .insert(post)
    .select()
    .single();
  if (error) throw error;
  return data;
};
