import { validateSession } from "@/actions/action";
import { getFollowingsPost } from "@/service/post";

export async function GET() {
  const user = await validateSession();
  if (!user) return new Response("not loggined", { status: 403 });
  // const data = await getFollowingsPost(getNameByEmail(user.email));
  const data = await getFollowingsPost(user.id);
  return new Response(JSON.stringify(data), { status: 200 });
}
