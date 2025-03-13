import { getUserAllInformation } from "@/service/user";

type Context = {
  slug: string;
};

export async function GET(
  request: Request,
  { params }: { params: Promise<Context> }
) {
  const { slug } = await params;
  const data = await getUserAllInformation(slug);

  return new Response(JSON.stringify(data), { status: 200 });
}
