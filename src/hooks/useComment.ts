import useSWR, { useSWRConfig } from 'swr';
import { SupaComment } from '@/types/post';
import { useCallback } from 'react';

export default function useComment(postId: string) {
  const {
    data: comments,
    isLoading,
    mutate,
    // } = useSWR<Comment[]>(`/api/posts/${postId}`);
  } = useSWR<SupaComment[]>(`/api/posts/${postId}`);

  const { mutate: globalMutate } = useSWRConfig();

  // usePosts의 updatePostLike에는 useCallback을 감싸주지 않음.
  // 해당 함수를 호출할 때마다 새롭게 전달되는 매개변수를 전달하고 이걸 기반으로 api 요청을 하기에 useCallback 필요없음.
  // updateComment 같은 경우는 함수 호출마다 comment를 새롭게 전달받긴 하지만, 이 함수 외부 변수인 postId에 의존하고 있는데,
  // 이 변수가 바뀌지 않는다면 함수는 그대로 사용해도 괜찮음. 그렇기에 useCallback 감아줌.
  const updateComment = useCallback(
    async (comment: Omit<SupaComment, 'reactions'>) => {
      return await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ postId, comment }),
      }).then((res) => res.json());
    },
    [postId],
  );

  const setComment = useCallback(
    (comment: SupaComment) => {
      let newComments;
      if (comment?.id) {
        newComments = comments?.map(({ id, ...rest }) =>
          id === comment.id
            ? { id, ...rest, body: comment.body }
            : { id, ...rest },
        );
      } else {
        newComments = [
          ...(comments?.length ? comments : []),
          {
            ...comment,
            avatarUrl: comment.avatarUrl,
            userName: comment.userName,
          },
        ];
      }

      mutate(updateComment(comment), {
        optimisticData: newComments,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      }).then(() => {
        const searchParams = new URLSearchParams(window.location.search);
        return globalMutate(`/api/posts?date=${searchParams.get('date')}`);
      });
    },
    [comments, mutate, updateComment, globalMutate],
  );

  const toggleReactionOnComment = async (commentId: string, emoji: string) => {
    let newReactions = [],
      addFlag = false;

    // Optimistic update: UI를 먼저 업데이트
    const optimisticComments = comments?.map((comment) => {
      if (comment.id === commentId) {
        const existingReaction = comment.reactions?.find(
          (r: { emoji: string }) => r.emoji === emoji,
        );

        if (existingReaction?.reactedByMe && existingReaction.emoji === emoji) {
          // 이미 있으면 제거
          newReactions = comment.reactions.map((reaction) => {
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

          if (comment.reactions?.length === 0) {
            newReactions = [
              {
                emoji,
                count: 1,
                reactedByMe: true,
              },
            ];
          } else {
            let added = false;
            newReactions =
              comment.reactions?.map((_reaction) => {
                if (_reaction.emoji === emoji) {
                  added = true;
                  return {
                    ..._reaction,
                    count: _reaction.count + 1,
                    reactedByMe: true,
                  };
                }

                return _reaction;
              }) || [];

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
          ...comment,
          reactions: newReactions,
        };
      }
      return comment;
    });

    // Optimistic update 적용
    mutate(optimisticComments, { revalidate: false });

    try {
      let result;
      if (addFlag) {
        result = await fetch(`/api/comments/${commentId}/reaction`, {
          method: 'POST',
          body: JSON.stringify({
            commentId,
            emoji,
          }),
        }).then((res) => res.json());
      } else {
        result = await fetch(
          `/api/comments/${commentId}/reaction/${encodeURIComponent(emoji)}`,
          {
            method: 'DELETE',
          },
        ).then((res) => res.json());
      }
    } catch (error) {
      console.error('Failed to toggle reaction:', error);
      // 에러 발생 시 원래 상태로 롤백
      mutate(comments, { revalidate: true });
      throw error;
    }
  };

  return { comments, isLoading, setComment, toggleReactionOnComment };
}
