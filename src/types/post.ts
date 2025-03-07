import { User } from "@/types/user";

export type Post = {
  postId: string;
  title: string;
  author: User;
  image?: string;
  content: string;
  //   comments:
};

export type Comment = {
  comment: string;
  username: string;
  image: string;
};

export type SimplePost = Omit<FullPost, "comment"> & {
  comments: number;
};

export type FullPost = {
  id: string;
  username: string;
  userImage: string;
  image: string;
  text: string;
  likes: string[];
  createdAt: string;
  comments: Comment[];
};
