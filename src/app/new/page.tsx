import { validateSession } from "@/actions/action";
import NewPost from "@/components/posts/NewPost";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metaData: Metadata = {
  title: "New Post",
  description: "Create a new post",
};

const page = async () => {
  const session = await validateSession();
  if (!session) {
    redirect("/auth/login");
  }

  return (
    <section className="w-full max-w-[850px]">
      <NewPost />
    </section>
  );
};

export default page;
