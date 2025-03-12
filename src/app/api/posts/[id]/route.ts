import { validateSession } from "@/actions/action";
import { getPostComments } from "@/service/post";

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
