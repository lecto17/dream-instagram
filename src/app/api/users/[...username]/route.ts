import {
  getUserAllInformation,
  getUserProfileTabInformation,
} from "@/service/user";
import { notFound } from "next/navigation";

type Context = {
  username: string[];
};

export async function GET(
  request: Request,
  { params }: { params: Promise<Context> }
) {
  const { username } = await params;
  let data;

  if (username.length === 1) {
    data = await getUserAllInformation(username[0]);
  } else if (username.length === 2) {
    data = await getUserProfileTabInformation(username[0], username[1]);
  }

  if (!data) {
    notFound();
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
