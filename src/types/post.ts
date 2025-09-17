import { SimpleUser, SupaUserProfile, User } from '@/types/user';

export type SupaPost = {
  id: string;
  authorId: string;
  caption: string;
  imageKey: string;
  createdAt: string;
  updatedAt: string;
  comments: number;
  author: Pick<SupaUserProfile, 'avatarUrl' | 'userName' | 'id'>;
};

export type SupaComment = {
  body: string;
  user: Pick<SupaUserProfile, 'avatarUrl' | 'userName'>;
  id?: string;
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
