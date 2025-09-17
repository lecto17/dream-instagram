import {
  addBookMarkOnPost,
  getFollowingsBy,
  removeBookMarkOnPost,
} from '@/service/user';
import {
  getAuthenticatedUser,
  // validateSession
} from '@/actions/action';
import { NextRequest, NextResponse } from 'next/server';
import { getMyProfile, updateUserProfile } from '@/service/supa-user';

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

export async function PUT(req: NextRequest) {
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

  /**
   * TODO
   * 이미지 s3 업로드 url 받아오기
   */

  const user = await getAuthenticatedUser();
  if (!user) return new Response('UnAthenticated Error');

  const { userName, avatarFile } = await req.json();

  await updateUserProfile(user.id, userName, avatarFile);
  return new Response(JSON.stringify({ message: 'success' }), { status: 200 });
}
