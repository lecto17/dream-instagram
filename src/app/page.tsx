import { auth } from "/auth";
import StoryList from "@/components/stories/StoryList";
import PostList from "@/components/posts/PostList";
import AvatarLocalNav from "@/components/navigation/AvatarLocalNav";
import { redirect } from "next/navigation";
import { getNameByEmail } from "@/utils/utils";

export default async function HomePage() {
  const session = await auth();
  const user = session?.user;

  const posts = [];

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <section className="flex p-5">
      <div className="flex flex-col basis-3/4">
        <StoryList userName={getNameByEmail(user.email)} />
        <PostList posts={posts} />
      </div>
      <div className="basis-1/4 sm:hidden md:block">
        <AvatarLocalNav user={user} />
      </div>
    </section>
  );
}
