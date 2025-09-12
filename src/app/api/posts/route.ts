// import { validateSession } from '@/actions/action';
import { serverSupabase } from '@/lib/supabaseClient';
import { getFollowingsPost } from '@/service/post';
import { getPosts } from '@/service/supa-post';
// import { findUserIdBy } from '@/service/user';

// export async function GET() {
//   const user = await validateSession();
//   if (!user) return new Response("not loggined", { status: 403 });
//   // const data = await getFollowingsPost(getNameByEmail(user.email));
//   const { id } = await findUserIdBy(user.email);
//   const data = await getFollowingsPost(id);
//   return new Response(JSON.stringify(data), { status: 200 });
// }

export async function GET() {
  const client = await serverSupabase();

  if (!client) return new Response('not loggined', { status: 403 });
  const data = await getPosts(client);

  return new Response(JSON.stringify(data), { status: 200 });
}
