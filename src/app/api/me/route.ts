// import { auth } from "/auth";
import { getNameByEmail } from "@/utils/utils";
import { getUserByname } from "@/service/user";
import { validateSession } from "@/actions/action";

export async function GET() {
  // const session = await auth();
  // const user = session?.user;

  // if (!user) {
  //   return new Response("[Error] UnAuthorized", { status: 401 });
  // }

  const user = await validateSession();

  const data = await getUserByname(getNameByEmail(user.email));
  return new Response(JSON.stringify(data), { status: 200 });
}
