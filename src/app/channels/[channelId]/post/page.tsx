import NewPost from '@/components/posts/NewPost';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '@/actions/action';

export const metadata: Metadata = {
  title: 'New Post',
  description: 'Create a new post',
};

const page = async ({ params }: { params: Promise<{ channelId: string }> }) => {
  const user = await getAuthenticatedUser();
  if (user == null) return redirect('/auth/login');

  const { channelId } = await params;

  if (channelId == null) {
    return redirect('/');
  }

  return (
    <section className="w-full max-w-[850px]">
      <NewPost channelId={channelId} />
    </section>
  );
};

export default page;
