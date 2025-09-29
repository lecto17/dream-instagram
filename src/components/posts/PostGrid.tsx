import Loading from '@/components/loading/Loading';
// import PostGridCard from '@/components/posts/PostGridCard';
import usePosts from '@/hooks/usePosts';

const PostGrid = () => {
  return <div>PostGrid</div>;

  // const { posts, isLoading } = usePosts();

  // if (isLoading) return <Loading />;

  // return (
  //   <section className="flex flex-col">
  //     <ul className="w-full mx-auto grid gap-2 grid-cols-3">
  //       {/* {posts?.map((post) => <PostGridCard key={post.id} post={post} />)} */}
  //     </ul>
  //     {(!posts?.length || !posts) && <div>No-data</div>}
  //   </section>
  // );
};

export default PostGrid;
