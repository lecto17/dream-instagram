"use client";

import Avatar from "@/components/avatar/Avatar";
import FollowButton from "@/components/button/FollowButton";
import Loading from "@/components/loading/Loading";
import UserProfileTab from "@/components/user/UserProfileTab";
import useUser from "@/hooks/useUser";
import { UserProfile } from "@/types/user";
import useSWR from "swr";

type Props = {
  propUserName: string;
};

const UserProfileHome = ({ propUserName }: Props) => {
  const { data, isLoading, error } = useSWR<UserProfile>(
    `/api/users/${propUserName}`
  );

  const { user } = useUser();

  if (isLoading) return <>{isLoading && <Loading />}</>;
  if (!data || !Object.keys(data).length || !user || !Object.keys(user).length)
    return <>사용자가 존재하지 않습니다.</>;

  // 로그인한 유저의 following
  const { following, id: loginUserId } = user;
  // Profile user의 정보
  const { id: profileUserId, image, followers, username, name, posts } = data;

  const isFollow =
    following?.some(
      ({ id: followingUserId }) => profileUserId === followingUserId
    ) ?? false;

  return (
    <>
      {error && <Loading />}

      <div className="flex flex-col w-full items-center">
        <section className="flex w-full justify-center items-center py-8 mb-10">
          <Avatar user={{ username, image }} size="ultra" />
          <div className="flex flex-col ml-7 space-y-2 mr-2">
            <h1 className="text-2xl">{username}</h1>
            <p className="flex space-x-3 text-sm">
              <span className="font-bold">{posts}</span> &nbsp;posts
              <span className="font-bold">{following?.length}</span>{" "}
              &nbsp;following
              <span className="font-bold">{followers}</span> &nbsp;followers
            </p>
            <p className="text-2xl font-bold">{name}</p>
          </div>
          {loginUserId !== profileUserId && (
            <FollowButton
              profileUserId={profileUserId || ""}
              profileUserName={propUserName}
              isFollow={isFollow}
            />
          )}
        </section>
        <UserProfileTab propUserName={propUserName} />
      </div>
    </>
  );
};

export default UserProfileHome;
