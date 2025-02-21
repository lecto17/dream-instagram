import { User } from "@/types/user";

export type Post = {
  postId: string;
  title: string;
  author: User;
  image?: string;
  content: string;
  //   comments:
};
