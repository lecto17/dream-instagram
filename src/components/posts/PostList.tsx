"use client";
import { LOADING_BAR_COLOR } from "@/constants/color";
import PostCard from "@/components/posts/PostCard";
import GridSpinner from "@/components/spinner/GridSpinner";
import usePosts from "@/hooks/usePosts";
import RecommendUsers from "@/components/user/RecommendUsers";

const PostList = () => {
  const { posts, isLoading, addCommentOnPost } = usePosts();

  if (isLoading) {
    return (
      <div className="w-full flex justify-center mt-32">
        <GridSpinner color={LOADING_BAR_COLOR} />
      </div>
    );
  }

  if (!posts?.length) {
    return <RecommendUsers />;
  }

  return (
    <ul className="flex flex-col items-center">
      {!!posts?.length &&
        posts.map((post, idx) => (
          <li key={post.id}>
            <PostCard
              key={post.id}
              post={post}
              priority={idx < 2}
              addCommentOnPost={addCommentOnPost}
            />
          </li>
        ))}
    </ul>
  );
};

export default PostList;
