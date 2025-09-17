import {
  getAuthenticatedUser,
  // validateSession
} from '@/actions/action';
import { getMyProfile } from '@/service/supa-user';

// export async function GET() {
//   const user = await validateSession();
//   if (!user) return new Response('UnAthenticated Error');

//   const data = await getFollowingsBy(user.email || '');
//   return new Response(JSON.stringify(data), { status: 200 });
// }

export async function GET() {
  const user = await getAuthenticatedUser();
  if (!user) return new Response('UnAthenticated Error');

  const profile = await getMyProfile(user.id);
  return new Response(JSON.stringify(profile), { status: 200 });
}

export async function PUT() {
  // export async function PUT(req: NextRequest) {
  // const user = await validateSession();
  // if (!user) {
  //   return new Response('Authenticated Error');
  // }
  // const { postId, bookmark } = await req.json();
  // if (!postId || bookmark === undefined) {
  //   return new Response('Bad Request', { status: 400 });
  // }
  // const request = bookmark ? addBookMarkOnPost : removeBookMarkOnPost;
  // return request(postId, user.id)
  //   .then(NextResponse.json)
  //   .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}
