"use client";
import { SimplePost } from "@/types/post";
import useSWR from "swr";
import { LOADING_BAR_COLOR } from "@/constants/color";
import PostCard from "@/components/posts/PostCard";
import GridSpinner from "@/components/spinner/GridSpinner";

const PostList = () => {
  const { data: posts, isLoading } = useSWR<SimplePost[]>("/api/posts");

  return (
    <section>
      <ul className="flex flex-col items-center">
        {isLoading && (
          <div className="w-full flex justify-center mt-32">
            <GridSpinner color={LOADING_BAR_COLOR} />
          </div>
        )}
        {posts?.length &&
          posts.map((post, idx) => (
            <PostCard key={post.id} post={post} priority={idx < 2} />
          ))}
      </ul>
    </section>
  );
};

export default PostList;
