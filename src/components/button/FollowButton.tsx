"use client";

import useUser from "@/hooks/useUser";

type Props = {
  isFollow: boolean;
  profileUserId: string;
  profileUserName: string;
};

const FollowButton = ({ profileUserId, isFollow, profileUserName }: Props) => {
  const { setFollowing } = useUser();
  const handleClick = () => {
    setFollowing(profileUserId, profileUserName, !isFollow);
  };

  return (
    <button
      className={`w-32 h-12 rounded-md font-bold ${isFollow ? "bg-red-500" : "bg-blue-500 text-white"}`}
      onClick={handleClick}
    >
      {isFollow ? "UnFollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
