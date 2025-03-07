import { getNameByEmail } from "@/utils/utils";
import { validateSession } from "@/actions/action";
import { getFollowingsPost } from "@/service/post";

export async function GET() {
  const user = await validateSession();
  const data = await getFollowingsPost(getNameByEmail(user.email));
  return new Response(JSON.stringify(data), { status: 200 });
}
