// import { validateSession } from "@/actions/action";
import { getAuthenticatedUser } from '@/actions/action';
// import { addPost } from '@/service/post';
import { addPost } from '@/service/supa-post';
import { uploadFileToS3 } from '@/service/s3-upload';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const user = await getAuthenticatedUser();

  if (!user) {
    return new Response('Authenticated Error');
  }

  let publicUrl = '';
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const text = formData.get('text') as string;
  const fileName = formData.get('fileName') as string;
  const channelId = formData.get('channelId') as string;

  if (file != null) {
    const { url } = await uploadFileToS3({
      file,
      fileName,
    });
    publicUrl = url;
  }

  const param = {
    authorId: user.id,
    caption: text,
    imageKey: publicUrl,
    channelId: channelId,
  };

  return addPost(param)
    .then(NextResponse.json)
    .catch((err) => {
      return new Response(JSON.stringify(err), { status: 500 });
    });
}

// export async function POST(req: NextRequest) {
//   const user = await validateSession();

//   if (!user) {
//     return new Response('Authenticated Error');
//   }

//   const formData = await req.formData();
//   const file = formData.get('file') as File;
//   const text = formData.get('text') as string;

//   if (!text) {
//     return new Response('Bad Request', { status: 400 });
//   }

//   //   const request = comment?.id ? updateComment : addComment;
//   const request = addPost;

//   return request(text, file, user.id)
//     .then(NextResponse.json)
//     .catch((err) => {
//       return new Response(JSON.stringify(err), { status: 500 });
//     });
// }
