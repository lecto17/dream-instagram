import { SimplePost } from "@/types/post";
import useSWR, { useSWRConfig } from "swr";

export default function usePosts() {
  const { mutate } = useSWRConfig();
  const { data: posts, isLoading, error } = useSWR<SimplePost[]>("api/posts");

  const setLike = (post: SimplePost, like: boolean) => {
    fetch("/api/likes", {
      method: "PUT",
      body: JSON.stringify({ id: post.id, like }),
    }).then(() => mutate("api/posts"));
  };

  return { posts, isLoading, error, setLike };
}
