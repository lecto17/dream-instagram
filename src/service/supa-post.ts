import { supaPost } from '@/types/post';
import { objectMapper } from '@/utils/mapper';
import { SupabaseClient } from '@supabase/supabase-js';

export const getPosts = async (client: SupabaseClient) => {
  const { data, error } = await client.from('posts').select('*');

  if (error) throw error;

  const transformedData = data?.map(objectMapper);
  return transformedData;
};

export const addPost = async (client: SupabaseClient, post: supaPost) => {
  const { data, error } = await client.from('posts').insert(post);
  if (error) throw error;
  return data;
};
