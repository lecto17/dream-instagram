import {
  getAuthenticatedUser,
  // validateSession
} from '@/actions/action';
import { NextRequest } from 'next/server';
import { getMyProfile, updateUserProfile } from '@/service/supa-user';
import { uploadFileToS3 } from '@/service/s3-upload';

// export async function GET() {
//   const user = await validateSession();
//   if (!user) return new Response('UnAthenticated Error');

//   const data = await getFollowingsBy(user.email || '');
//   return new Response(JSON.stringify(data), { status: 200 });
// }

export async function GET(req: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) return new Response('UnAthenticated Error');

  // Query parameter에서 channelId 추출
  const { searchParams } = new URL(req.url);
  const channelId = searchParams.get('channelId');

  if (!channelId) {
    return new Response('ChannelId is required', { status: 400 });
  }

  const profile = await getMyProfile(user.id, channelId);
  return new Response(JSON.stringify(profile), { status: 200 });
}

export async function PUT(req: NextRequest) {
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

  /**
   * TODO
   * 이미지 s3 업로드 url 받아오기
   */

  const user = await getAuthenticatedUser();
  if (!user) return new Response('UnAthenticated Error');

  const { searchParams } = new URL(req.url);
  const channelId = searchParams.get('channelId');

  if (channelId == null) {
    return new Response('ChannelId is required', { status: 400 });
  }

  // const { userName, avatarFile } = await req.json();
  const formData = await req.formData();
  const userName = formData.get('userName') as string;
  const avatarFile = formData.get('avatarFile') as File;

  let fileUrl;
  if (avatarFile) {
    const { url } = await uploadFileToS3({
      file: avatarFile,
      fileName: avatarFile.name,
    });
    fileUrl = url;
  }

  await updateUserProfile(user.id, channelId, userName, fileUrl);
  return new Response(JSON.stringify({ message: 'success' }), { status: 200 });
}
