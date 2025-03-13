import { getUserBy } from "@/service/user";

type Context = {
  slug: string;
};

export async function GET(
  request: Request,
  { params }: { params: Promise<Context> }
) {
  const { slug } = await params;

  if (!slug) return new Response(JSON.stringify([]), { status: 200 });

  const data = await getUserBy(slug);
  return new Response(JSON.stringify(data), { status: 200 });
}
