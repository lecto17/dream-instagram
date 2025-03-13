import Avatar, { AvatarSize } from "@/components/avatar/Avatar";
import { SimpleUser } from "@/types/user";

type Props = {
  user: SimpleUser;
  avatarSize?: AvatarSize;
  location?: string;
  noLocation?: boolean;
  children?: React.ReactNode;
};

const PostUserAvatar = ({
  user,
  avatarSize = "small",
  location = "인천광역시, 영종도",
  noLocation,
  children,
}: Props) => {
  return (
    <>
      <Avatar user={user} size={avatarSize} />
      <p className="flex flex-col ml-2 text-base text-gray-700">
        <span className="font-semibold">{user.username}</span>
        {!noLocation && (
          <span className="text-xs leading-3 text-gray-500">{location}</span>
        )}
        {children}
      </p>
    </>
  );
};

export default PostUserAvatar;
