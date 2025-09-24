import { ReactionStats, TransformedReactionStats } from '@/types/reaction';
import { SimpleUser, SupaUserProfile, User } from '@/types/user';

export type SupaPost = {
  id: string;
  authorId: string;
  caption: string;
  imageKey: string;
  createdAt: string;
  updatedAt: string | null;
  comments: number;
  author: Pick<SupaUserProfile, 'avatarUrl' | 'userName' | 'id'>;
  reactions: TransformedReactionStats[];
};

export type RawSupaPost = Omit<SupaPost, 'reactions'> & {
  reactions: ReactionStats[];
};

export type SupaComment = {
  body: string;
  avatarUrl: string | null;
  userName: string;
  id?: string;
  reactions: TransformedReactionStats[];
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
