import { SimpleUser, User } from '@/types/user';

export type supaPost = {
  id: string;
  authorId: string;
  caption: string;
  imageKey: string;
  createdAt: string;
  updatedAt: string;
};

export type Post = {
  postId: string;
  title: string;
  author: User;
  image?: string;
  content: string;
};

export type Comment = {
  comment: string;
  user: SimpleUser;
  id?: string;
};

export type SimplePost = Omit<FullPost, 'comments'> & {
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
