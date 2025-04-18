import { auth } from "/auth";
import StoryList from "@/components/stories/StoryList";
import PostList from "@/components/posts/PostList";
import AvatarLocalNav from "@/components/navigation/AvatarLocalNav";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <section className="w-full flex flex-col sm:flex-row p-5 max-w-[850px]">
      <div className="w-full basis-3/4 min-w-0">
        <StoryList />
        <PostList />
      </div>
      <div className="hidden sm:block basis-1/4 ml:8">
        <AvatarLocalNav user={user} />
      </div>
    </section>
  );
}
