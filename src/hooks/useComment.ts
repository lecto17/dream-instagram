import useSWR from "swr";
import { Comment } from "@/types/post";

export default function useComment(postId: string) {
  const {
    data: comments,
    isLoading,
    mutate,
  } = useSWR<Comment[]>(`api/posts/${postId}`);

  const updateComment = async (comment: Comment) => {
    return fetch(`/api/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({ postId, comment }),
    }).then((res) => res.json());
  };

  const setComment = (comment: Comment) => {
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
        { ...comment, id: "" },
      ];
    }

    mutate(updateComment(comment), {
      optimisticData: newComments,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return { comments, isLoading, setComment };
}
