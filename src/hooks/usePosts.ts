import { useCacheKeyContext } from '@/context/CacheKeyContext';
import { SupaComment, SupaPost } from '@/types/post';
import { getDateYYYYMMDDWithDash } from '@/utils/utils';
import { useCallback } from 'react';
import useSWR, { useSWRConfig } from 'swr';

export default function usePosts(channelId: string, date?: string) {
  const { postsKey } = useCacheKeyContext();
  const today = getDateYYYYMMDDWithDash().replaceAll('-', '');
  const key = `${postsKey}?channelId=${channelId}&date=${date || today}`;

  const { data: posts, isLoading, error, mutate } = useSWR<SupaPost[]>(key);
  const { mutate: globalMutate } = useSWRConfig();

  const addPost = async (text: string, file?: File) => {
    const formData = new FormData();

    formData.append('text', text);
    formData.append('channelId', channelId);

    if (file) {
      formData.append('file', file);
      formData.append('fileName', file.name);
    }

    await fetch('/api/post', {
      method: 'POST',
      body: formData,
    })
      .then(() => mutate(undefined, { revalidate: true }))
      .catch((err) => new Error(err));
  };

  const upsertCommentOnPost = useCallback(
    (postId: string, comment: SupaComment) => {
      return fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ postId, comment, channelId }),
      }).then((res) => res.json());
    },
    [],
  );

  const addCommentOnPost = useCallback(
    async (comment: SupaComment, postId: string) => {
      let newPosts;
      if (comment?.id) {
        // newPosts = comments?.map(({ id, ...rest }) =>
        //   id === comment.id
        //     ? { id, ...rest, comment: comment.comment }
        //     : { id, ...rest }
        // );
      } else {
        newPosts = posts?.map((el) => {
          if (postId === el.id) {
            return {
              ...el,
              commentCount: el.commentCount + 1,
            };
          } else return el;
        });
      }

      mutate(upsertCommentOnPost(postId, comment), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });

      globalMutate(`/api/posts/${postId}`);
    },
    [posts, mutate, upsertCommentOnPost, globalMutate],
  );

  const toggleReactionOnPost = useCallback(
    async (postId: string, emoji: string) => {
      let newReactions,
        addFlag = false;

      // Optimistic update: UI를 먼저 업데이트
      const optimisticPosts = posts?.map((post) => {
        if (post.id === postId) {
          const existingReaction = post.reactions.find(
            (r: { emoji: string }) => r.emoji === emoji,
          );

          if (
            existingReaction?.reactedByMe &&
            existingReaction.emoji === emoji
          ) {
            // 이미 있으면 제거
            newReactions = post.reactions.map((reaction) => {
              if (reaction.emoji === emoji) {
                return {
                  ...reaction,
                  count: reaction.count - 1 === 0 ? 0 : reaction.count - 1,
                  reactedByMe: false,
                };
              }
              return reaction;
            });
          } else {
            // 없으면 추가
            addFlag = true;

            if (post.reactions.length === 0) {
              newReactions = [
                {
                  emoji,
                  count: 1,
                  reactedByMe: true,
                },
              ];
            } else {
              let added = false;
              newReactions = post.reactions.map((_reaction) => {
                if (_reaction.emoji === emoji) {
                  added = true;
                  return {
                    ..._reaction,
                    count: _reaction.count + 1,
                    reactedByMe: true,
                  };
                }

                return _reaction;
              });

              if (!added) {
                newReactions = [
                  ...newReactions,
                  {
                    emoji,
                    count: 1,
                    reactedByMe: true,
                  },
                ];
              }
            }
          }
          return {
            ...post,
            reactions: newReactions,
          };
        }
        return post;
      });

      // Optimistic update 적용
      mutate(optimisticPosts, { revalidate: false });

      try {
        let result;
        if (addFlag) {
          result = await fetch(`/api/posts/${postId}/reaction`, {
            method: 'POST',
            body: JSON.stringify({
              postId,
              emoji,
            }),
          }).then((res) => res.json());
        } else {
          result = await fetch(
            `/api/posts/${postId}/reaction/${encodeURIComponent(emoji)}`,
            {
              method: 'DELETE',
            },
          ).then((res) => res.json());
        }
      } catch (error) {
        console.error('Failed to toggle reaction:', error);
        // 에러 발생 시 원래 상태로 롤백
        mutate(posts, { revalidate: true });
        throw error;
      }
    },
    [posts, mutate, key],
  );

  return {
    posts,
    isLoading,
    error,
    addPost,
    addCommentOnPost,
    toggleReactionOnPost,
  };
}
