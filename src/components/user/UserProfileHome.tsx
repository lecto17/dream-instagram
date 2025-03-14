"use client";

import Avatar from "@/components/avatar/Avatar";
import Loading from "@/components/loading/Loading";
import UserProfileTab from "@/components/user/UserProfileTab";
import { UserProfile } from "@/types/user";
import useSWR from "swr";

type Props = {
  propUserName: string;
};

const UserProfileHome = ({ propUserName }: Props) => {
  const { data, isLoading, error } = useSWR<UserProfile>(
    `/api/users/${propUserName}`
  );

  if (isLoading) return <>{isLoading && <Loading />}</>;
  if (!data || !Object.keys(data).length)
    return <>사용자가 존재하지 않습니다.</>;

  console.log("whte ", data);

  const { image, following, followers, username, name, posts } = data;

  return (
    <>
      {error && <Loading />}

      <div className="flex flex-col w-full items-center">
        <section className="flex w-full justify-center items-center py-8 mb-10">
          <Avatar user={{ username, image }} size="ultra" />
          <div className="flex flex-col ml-7 space-y-2">
            <h1 className="text-2xl">{username}</h1>
            <p className="flex space-x-3 text-sm">
              <span className="font-bold">{posts}</span> &nbsp;posts
              <span className="font-bold">{following}</span> &nbsp;following
              <span className="font-bold">{followers}</span> &nbsp;followers
            </p>
            <p className="text-2xl font-bold">{name}</p>
          </div>
        </section>
        <UserProfileTab propUserName={propUserName} />
      </div>
    </>
  );
};

export default UserProfileHome;
