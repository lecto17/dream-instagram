import { validateSession } from "@/actions/action";
import { getRecommendUsers } from "@/service/user";

export async function GET() {
  const user = await validateSession();
  if (!user) return new Response("unAuthenticated Error", { status: 401 });

  const data = await getRecommendUsers(user.id);
  return new Response(JSON.stringify(data), { status: 200 });
}
