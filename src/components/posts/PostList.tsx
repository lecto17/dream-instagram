'use client';
import { LOADING_BAR_COLOR } from '@/constants/color';
import PostCard from '@/components/posts/PostCard';
import GridSpinner from '@/components/spinner/GridSpinner';
import usePosts from '@/hooks/usePosts';
import { useSearchParams } from 'next/navigation';
import { getDateYYYYMMDDWithDash } from '@/utils/utils';
// import RecommendUsers from "@/components/user/RecommendUsers";

const PostList = () => {
  const date =
    useSearchParams().get('date') ||
    getDateYYYYMMDDWithDash().replaceAll('-', '');
  const { posts, isLoading, addCommentOnPost } = usePosts(date);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center mt-32">
        <GridSpinner color={LOADING_BAR_COLOR} />
      </div>
    );
  }

  // if (!posts?.length) {
  //   return <RecommendUsers />;
  // }

  return (
    <ul className="flex flex-col items-center h-full min-h-full overflow-y-auto p-5 space-y-10">
      {posts != null && posts.length > 0 ? (
        posts.map((post, idx) => (
          <li key={post.id}>
            <PostCard
              key={post.id}
              post={post}
              priority={idx < 2}
              addCommentOnPost={addCommentOnPost}
            />
          </li>
        ))
      ) : (
        <div className="w-full flex justify-center mt-32">
          <p className="text-gray-500 whitespace-pre-line">
            {'해당 일자에 게시글이 없습니다.\n\n먼저 게시글을 등록해보세요 🙂'}
          </p>
        </div>
      )}
    </ul>
  );
};

export default PostList;
