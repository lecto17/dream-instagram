import { getNameByEmail } from "@/utils/utils";
import {
  addBookMarkOnPost,
  getFollowingsByUserName,
  removeBookMarkOnPost,
} from "@/service/user";
import { validateSession } from "@/actions/action";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const user = await validateSession();
  const data = await getFollowingsByUserName(getNameByEmail(user.email));

  return new Response(JSON.stringify(data), { status: 200 });
}

export async function PUT(req: NextRequest) {
  const user = await validateSession();

  if (!user) {
    return new Response("Authenticated Error");
  }

  const { postId, bookmark } = await req.json();

  if (!postId || bookmark === undefined) {
    return new Response("Bad Request", { status: 400 });
  }

  const request = bookmark ? addBookMarkOnPost : removeBookMarkOnPost;

  return request(postId, user.id)
    .then(NextResponse.json)
    .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}
