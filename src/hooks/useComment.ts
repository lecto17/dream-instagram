import useSWR, { useSWRConfig } from "swr";
import { Comment } from "@/types/post";
import { useCallback } from "react";

export default function useComment(postId: string) {
  const {
    data: comments,
    isLoading,
    mutate,
  } = useSWR<Comment[]>(`api/posts/${postId}`);

  const { mutate: globalMutate } = useSWRConfig();

  // usePosts의 updatePostLike에는 useCallback을 감싸주지 않음.
  // 해당 함수를 호출할 때마다 새롭게 전달되는 매개변수를 전달하고 이걸 기반으로 api 요청을 하기에 useCallback 필요없음.
  // updateComment 같은 경우는 함수 호출마다 comment를 새롭게 전달받긴 하지만, 이 함수 외부 변수인 postId에 의존하고 있는데,
  // 이 변수가 바뀌지 않는다면 함수는 그대로 사용해도 괜찮음. 그렇기에 useCallback 감아줌.
  const updateComment = useCallback(
    async (comment: Comment) => {
      return fetch(`/api/posts/${postId}`, {
        method: "PUT",
        body: JSON.stringify({ postId, comment }),
      }).then((res) => res.json());
    },
    [postId]
  );

  const setComment = useCallback(
    (comment: Comment) => {
      let newComments;
      if (comment?.id) {
        newComments = comments?.map(({ id, ...rest }) =>
          id === comment.id
            ? { id, ...rest, comment: comment.comment }
            : { id, ...rest }
        );
      } else {
        newComments = [
          ...(comments?.length ? comments : []),
          {
            ...comment,
            user: {
              image: comment.user.image,
              username: comment.user.username,
            },
          },
        ];
      }

      mutate(updateComment(comment), {
        optimisticData: newComments,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      }).then(() => globalMutate("/api/posts"));
    },
    [comments, mutate, updateComment, globalMutate]
  );

  return { comments, isLoading, setComment };
}
