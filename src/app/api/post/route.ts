import { validateSession } from "@/actions/action";
import { addPost } from "@/service/post";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await validateSession();

  if (!user) {
    return new Response("Authenticated Error");
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const text = formData.get("text") as string;

  if (!text) {
    return new Response("Bad Request", { status: 400 });
  }

  //   const request = comment?.id ? updateComment : addComment;
  const request = addPost;

  return request(text, file, user.id)
    .then(NextResponse.json)
    .catch((err) => {
      return new Response(JSON.stringify(err), { status: 500 });
    });
}
