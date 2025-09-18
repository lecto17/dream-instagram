import { SupaComment, SupaPost } from '@/types/post';
import { objectMapper } from '@/utils/mapper';
import { serverSupabase } from '@/lib/supabaseServerClient';

export const getPosts = async (date: string) => {
  const client = await serverSupabase();

  // posts 테이블과 users 테이블로 만든 뷰에서 게시글 조회
  const { data: posts, error } = await client
    .from('posts_enriched')
    .select('*')
    .gte('created_at', `${date}T00:00:00.000Z`)
    .lte('created_at', `${date}T23:59:59.999Z`)
    .order('created_at', { ascending: false });

  if (error) throw error;

  const postsWithCommentCount = await Promise.all(
    posts.map(async (post) => {
      const { data: comments } = await client
        .from('comments')
        .select('*')
        .eq('post_id', post.id);
      return { ...post, comments: comments?.length || 0 };
    }),
  );

  // const postsWithComments = await Promise.all(
  //   posts.map(async (post) => {
  //     const { data: comments } = await client
  //       .from('comments')
  //       .select(
  //         `
  //           id, post_id, author_id, body, created_at
  //         `,
  //       )
  //       .eq('post_id', post.id)
  //       .eq('is_deleted', false)
  //       .order('created_at', { ascending: false });
  //     const _transfored = comments?.map(objectMapper) || [];
  //     return { ...post, comments: _transfored };
  //   }),
  // );

  const transformedData = postsWithCommentCount?.map(objectMapper);
  return transformedData;
};

export const getPostComments = async (id: string) => {
  const client = await serverSupabase();
  const { data, error } = await client
    .from('comments_enriched')
    .select('*')
    .eq('post_id', id);

  if (error) throw error;
  return data.map(objectMapper);
};

export const addPost = async (
  post: Omit<SupaPost, 'comments' | 'id' | 'updatedAt' | 'author'>,
) => {
  const client = await serverSupabase();
  const { authorId, caption, imageKey, createdAt } = post;
  const { data, error } = await client
    .from('posts')
    .insert({
      author_id: authorId,
      caption,
      image_key: imageKey,
      created_at: createdAt,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const addComment = async (
  postId: string,
  userId: string,
  comment: SupaComment,
) => {
  const client = await serverSupabase();
  const { data, error } = await client
    .from('comments')
    .insert({
      post_id: postId,
      author_id: userId,
      body: comment.body,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();
  if (error) throw error;
  return data;
};
