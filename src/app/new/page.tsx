// import { validateSession } from "@/actions/action";
import NewPost from '@/components/posts/NewPost';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '@/actions/action';

export const metadata: Metadata = {
  title: 'New Post',
  description: 'Create a new post',
};

const page = async () => {
  const user = await getAuthenticatedUser();
  if (user == null) return redirect('/auth/login');

  // const session = await validateSession();
  // if (!session) {
  //   redirect('/auth/login');
  // }

  return (
    <section className="w-full max-w-[850px]">
      <NewPost user={user} />
    </section>
  );
};

export default page;
