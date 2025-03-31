import Avatar from "@/components/avatar/Avatar";
import { SearchUser } from "@/types/user";
import Link from "next/link";

type Props = {
  user: SearchUser;
};

const SearchUserAvatar = ({
  user: { followers, following, image, name, username },
}: Props) => {
  return (
    <li className="border border-gray-300 w-full p-5 mb-2 bg-white hover:bg-neutral-50">
      <Link
        href={`/users/${username}`}
        className="w-full flex justify-center items-center"
      >
        <Avatar user={{ username, image }} size="big" isLink={false} />
        <div className="flex flex-col w-full leading-4 ml-3 text-gray-400">
          <span className="text-black">{username}</span>
          <span>{name}</span>
          <p className="w-full flex">
            <span>{followers} followers</span>
            <span>{following} following</span>
          </p>
        </div>
      </Link>
    </li>
  );
};

export default SearchUserAvatar;
