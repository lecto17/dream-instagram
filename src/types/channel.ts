export type Channel = {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  isJoined: boolean;
  createdAt?: string;
  updatedAt?: string;
  isPrivate: boolean;
  needsPassword: boolean;
};

export type CreateChannelRequest = {
  name: string;
  description: string;
  isPrivate: boolean;
  password?: string;
};

export type JoinChannelRequest = {
  channelId: string;
};
