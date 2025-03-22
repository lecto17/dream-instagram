import { validateSession } from "@/actions/action";
import { addFollowing, deleteOnFollowing } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const user = await validateSession();

  if (!user) {
    return new Response("Authenticated Error");
  }

  const { profileUserId, addOnFollowing } = await req.json();

  if (!profileUserId || addOnFollowing === undefined) {
    return new Response("Bad Request", { status: 400 });
  }

  const request = addOnFollowing ? addFollowing : deleteOnFollowing;

  return request(user.id, profileUserId)
    .then(NextResponse.json)
    .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}
