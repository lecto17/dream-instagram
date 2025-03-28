"use client";

import Loading from "@/components/loading/Loading";
import { DetailUser } from "@/types/user";
import { useState } from "react";

type Props = {
  user: DetailUser | undefined;
  profileUserId: string;
  profileUsername: string;
  setFollowing: (username: string, userId: string, follow: boolean) => void;
};

const FollowButton = ({
  profileUsername,
  profileUserId,
  user: me,
  setFollowing,
}: Props) => {
  const [loading, setLoading] = useState(false);

  // 로그인한 유저의 following
  const loginUserId = me?.id ?? "";

  if (loginUserId === profileUserId || !me) return;

  const isFollow =
    me?.following?.some(
      ({ id: followingUserId }) => profileUserId === followingUserId
    ) ?? false;

  const handleClick = async () => {
    setLoading(true);
    await setFollowing(profileUsername, profileUserId, !isFollow);
    setLoading(false);
  };

  return (
    <div className="relative w-fit h-fit">
      {loading && (
        <div className="absolute w-full h-full z-10 top-0 left-0">
          <Loading
            type="Pulse"
            color="#808080"
            style={"mt-0 h-full items-center bg-black/15"}
          />
        </div>
      )}
      <button
        className={`w-32 h-12 rounded-md font-bold cursor-pointer ${isFollow ? "bg-red-500" : "bg-blue-500 text-white"}`}
        onClick={handleClick}
        disabled={loading}
      >
        {isFollow ? "UnFollow" : "Follow"}
      </button>
    </div>
  );
};

export default FollowButton;
