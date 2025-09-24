import Avatar, { AvatarSize } from '@/components/avatar/Avatar';
import { SupaUserProfile } from '@/types/user';
import type { ReactNode } from 'react';

type Props = {
  user: SupaUserProfile;
  avatarSize?: AvatarSize;
  location?: string;
  noLocation?: boolean;
  children?: ReactNode;
};

const PostUserAvatar = ({
  user,
  avatarSize = 'small',
  location = '인천광역시, 영종도',
  noLocation,
  children,
}: Props) => {
  return (
    <>
      <Avatar
        user={user}
        size={avatarSize}
      />
      <p className="flex flex-col ml-2 text-base text-gray-700">
        <span className="font-semibold">{user.userName}</span>
        {!noLocation && (
          <span className="text-xs leading-3 text-gray-500">{location}</span>
        )}
        {children}
      </p>
    </>
  );
};

export default PostUserAvatar;
