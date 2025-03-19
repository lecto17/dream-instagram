import { validateSession } from "@/actions/action";
import { dislikePost, likePost } from "@/service/post";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const user = await validateSession();

  if (!user) {
    return new Response("Authenticated Error");
  }

  const { id, like } = await req.json();

  if (!id || like === undefined) {
    return new Response("Bad Request", { status: 400 });
  }

  const request = like ? likePost : dislikePost;

  return request(id, user.id)
    .then(NextResponse.json)
    .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}
