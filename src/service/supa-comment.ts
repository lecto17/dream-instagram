import { serverSupabase } from '@/lib/supabaseServerClient';

export const addReactionOnComment = async (
  commentId: string,
  userId: string,
  emoji: string,
) => {
  const client = await serverSupabase();
  const { data, error } = await client
    .from('comment_reactions')
    .insert({
      comment_id: commentId,
      user_id: userId,
      emoji,
    })
    .select();

  if (error) throw error;

  return data;
};

export const deleteReactionOnComment = async (
  commentId: string,
  userId: string,
  emoji: string,
) => {
  const client = await serverSupabase();
  const { error } = await client
    .from('comment_reactions')
    .delete()
    .eq('comment_id', commentId)
    .eq('user_id', userId)
    .eq('emoji', emoji);

  if (error) throw error;

  return true;
};
