"use client";
import { LOADING_BAR_COLOR } from "@/constants/color";
import PostCard from "@/components/posts/PostCard";
import GridSpinner from "@/components/spinner/GridSpinner";
import usePosts from "@/hooks/usePosts";
import RecommendUsers from "@/components/user/RecommendUsers";

const PostList = () => {
  const { posts, isLoading, addCommentOnPost } = usePosts();

  return (
    <ul className="flex flex-col items-center">
      {isLoading && (
        <div className="w-full flex justify-center mt-32">
          <GridSpinner color={LOADING_BAR_COLOR} />
        </div>
      )}
      {!!posts?.length ? (
        posts.map((post, idx) => (
          <PostCard
            key={post.id}
            post={post}
            priority={idx < 2}
            addCommentOnPost={addCommentOnPost}
          />
        ))
      ) : (
        <RecommendUsers />
      )}
    </ul>
  );
};

export default PostList;
