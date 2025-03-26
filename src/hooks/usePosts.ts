import { useCacheKeyContext } from "@/context/CacheKeyContext";
import { SimplePost } from "@/types/post";
import { useCallback } from "react";
import useSWR from "swr";

export default function usePosts() {
  const { postsKey } = useCacheKeyContext();

  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<SimplePost[]>(postsKey);

  // const { mutate: globalMutate } = useSWRConfig();

  const updatePostLike = async (id: string, like: boolean) => {
    return await fetch("/api/likes", {
      method: "PUT",
      body: JSON.stringify({ id, like }),
    }).then((res) => res.json());
  };

  const setLike = useCallback(
    (post: SimplePost, username: string, like: boolean) => {
      const newPost = {
        ...post,
        likes: like
          ? post.likes.length
            ? [...post.likes, username]
            : [username]
          : post.likes.filter((uname) => uname !== username),
      };

      const newPosts = posts?.map((postEl) =>
        post.id === postEl.id ? newPost : postEl
      );

      mutate(updatePostLike(post.id, like), {
        optimisticData: newPosts, // newPosts로 optimistic하게 UI 변경
        populateCache: false, // default: updatePostLike(mutate의 첫번째 인자)의 결과값으로 mutate함. updatePostLike에서 필요한 데이터를 가져오는 상태 X 기에, false
        revalidate: false, // default: 첫번째 인자 실행이 완료되면 다시금 data를 call하는데, 필요없기에 false
        rollbackOnError: true, // network 와 같은 에러 상황이 발생할 경우, UI rollback.(=true일 경우)
      });
      // .then(() => {
      //   console.log("global mutate");
      //   return globalMutate(`/api/users/${post.username}/${tab}`, null, {
      //     revalidate: true,
      //   });
      // });
    },
    [posts, mutate]
  );

  const addPost = async (text: string, file?: File) => {
    const formData = new FormData();
    formData.append("text", text);
    if (file) formData.append("file", file);

    await fetch("/api/post", {
      method: "POST",
      body: formData,
    })
      .then(() => mutate(undefined, { revalidate: true }))
      .catch((err) => new Error(err));
  };

  return { posts, isLoading, error, setLike, addPost };
}
