// import { validateSession } from '@/actions/action';
import { getAuthenticatedUser } from '@/actions/action';
import { serverSupabase } from '@/lib/supabaseServerClient';
import { getFollowingsPost } from '@/service/post';
import { getPosts } from '@/service/supa-post';
import { getYYYYMMDDLocal } from '@/utils/utils';
import { NextRequest } from 'next/server';
// import { findUserIdBy } from '@/service/user';

// export async function GET() {
//   const user = await validateSession();
//   if (!user) return new Response("not loggined", { status: 403 });
//   // const data = await getFollowingsPost(getNameByEmail(user.email));
//   const { id } = await findUserIdBy(user.email);
//   const data = await getFollowingsPost(id);
//   return new Response(JSON.stringify(data), { status: 200 });
// }

export async function GET(request: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) return new Response('not loggined', { status: 403 });

  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date') || getYYYYMMDDLocal();
  const data = await getPosts(date);

  return new Response(JSON.stringify(data), { status: 200 });
}
