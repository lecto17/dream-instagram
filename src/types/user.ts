export type User = {
  id: string;
  username?: string;
  name: string;
  email: string;
  image?: string | null;
  following?: User | [];
  followers?: User | [];
  bookmarks?: [];
};
