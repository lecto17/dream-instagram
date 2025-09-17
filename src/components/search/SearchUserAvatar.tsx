import Avatar from '@/components/avatar/Avatar';
// import { SearchUser, SupaUserProfile } from '@/types/user';
import { SupaUserProfile } from '@/types/user';
import Link from 'next/link';

type Props = {
  user: Pick<SupaUserProfile, 'avatarUrl' | 'userName'>;
};

const SearchUserAvatar = ({
  // user: { followers, following, image, name, userName },
  user: { avatarUrl, userName },
}: Props) => {
  return (
    <li className="border border-gray-300 w-full p-5 mb-2 bg-white hover:bg-neutral-50">
      <Link
        href={`/users/${userName}`}
        className="w-full flex justify-center items-center"
      >
        <Avatar
          user={{ avatarUrl, userName }}
          size="big"
          isLink={false}
        />
        <div className="flex flex-col w-full leading-4 ml-3 text-gray-400">
          <span className="text-black">{userName}</span>
          {/* <span>{name}</span> */}
          {/* <p className="w-full flex space-x-2">
            <span>{followers} followers</span>
            <span>{following} following</span>
          </p> */}
        </div>
      </Link>
    </li>
  );
};

export default SearchUserAvatar;
