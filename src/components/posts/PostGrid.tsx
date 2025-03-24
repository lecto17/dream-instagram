import Loading from "@/components/loading/Loading";
import PostGridCard from "@/components/posts/PostGridCard";
import { SimplePost } from "@/types/post";
import useSWR from "swr";

type Props = {
  username: string;
  tab: "posts" | "saved" | "liked";
};

const PostGrid = ({ username, tab }: Props) => {
  const { data: posts, isLoading } = useSWR<SimplePost[]>(
    `/api/users/${username}/${tab}`
  );

  if (isLoading) return <Loading />;

  return (
    <section className="flex flex-col">
      <ul className="w-full mx-auto grid gap-2 grid-cols-3">
        {posts?.map((post) => <PostGridCard key={post.id} post={post} />)}
      </ul>
      {(!posts?.length || !posts) && <div>No-data</div>}
    </section>
  );
};

export default PostGrid;
