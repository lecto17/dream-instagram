import { Post } from "@/types/post";

interface PostListProps {
  posts: Post[] | [];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <section>
      PostList
      {/* <ul>
        {posts.map((post) => (
          <PostCard key={post.postId} />
        ))}
      </ul> */}
    </section>
  );
};

export default PostList;
