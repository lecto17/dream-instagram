import { client } from "@/sanity/sanity";
import { getQuery } from "@/service/fetch";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const username = url.searchParams.get("username");

  if (!username) {
    return new Response("[ERROR] username is not given", { status: 400 });
  }

  const data = await client.fetch(getQuery("FOLLOWINGS", username));
  return new Response(JSON.stringify(data), { status: 200 });
}
