import { getNameByEmail } from "@/utils/utils";
import { getFollowingsByUserName } from "@/service/user";
import { validateSession } from "@/actions/action";

export async function GET() {
  const user = await validateSession();
  const data = await getFollowingsByUserName(getNameByEmail(user.email));

  return new Response(JSON.stringify(data), { status: 200 });
}
