import { validateSession } from "@/actions/action";
import { addComment, getPostComments, updateComment } from "@/service/post";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  id: string;
};

export async function GET(
  request: Request,
  { params }: { params: Promise<Context> }
) {
  await validateSession();
  const { id } = await params;
  const data = await getPostComments(id);

  return new Response(JSON.stringify(data), { status: 200 });
}

export async function PUT(req: NextRequest) {
  const user = await validateSession();

  if (!user) {
    return new Response("Authenticated Error");
  }

  const { postId, comment } = await req.json();

  if (!postId || !comment || !Object.keys(comment).length) {
    return new Response("Bad Request", { status: 400 });
  }

  const request = comment?.id ? updateComment : addComment;

  return request(postId, user.id, comment)
    .then(NextResponse.json)
    .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}
