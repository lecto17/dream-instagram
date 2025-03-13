export type User = {
  id: string;
  username?: string;
  name: string;
  email: string;
  image?: string | null;
};

export type SimpleUser = Pick<User, "username" | "image">;

// export interface SimpleUser extends Pick<User, "username" | "image"> {
//   username: string;
//   image: string;
// }

export type DetailUser = User & {
  following?: SimpleUser[] | [];
  followers?: SimpleUser | [];
  bookmarks?: string[];
};

export type SearchUser = {
  image: string;
  following: number;
  followers: number;
  name: string;
  username: string;
};
