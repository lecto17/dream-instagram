// import { validateSession } from "@/actions/action";
import { getAuthenticatedUser } from '@/actions/action';
// import { addPost } from '@/service/post';
import { addPost } from '@/service/supa-post';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const user = await getAuthenticatedUser();

  if (!user) {
    return new Response('Authenticated Error');
  }

  const formData = await req.formData();
  const file = formData.get('file') as File;
  const text = formData.get('text') as string;

  if (!text) {
    return new Response('Bad Request', { status: 400 });
  }

  const param = {
    author_id: user.id,
    caption: text,
    image_key: file?.name || '',
    created_at: new Date().toISOString(),
    updated_at: null,
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
