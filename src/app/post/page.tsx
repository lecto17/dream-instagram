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

  return (
    <section className="w-full max-w-[850px]">
      <NewPost />
    </section>
  );
};

export default page;
