"use client";
import useSWR from "swr";
import PropagateLoader from "react-spinners/PropagateLoader";
import { DetailUser } from "@/types/user";
import Avatar from "@/components/avatar/Avatar";

import "react-multi-carousel/lib/styles.css";
import ScrollableBar from "@/components/carousel/ScrollableBar";

const StoryList = () => {
  const { data, isLoading } = useSWR<DetailUser>("/api/me");
  const following = data?.following && [
    ...data.following,
    ...data.following,
    ...data.following,
    ...data.following,
    ...data.following,
    ...data.following,
    ...data.following,
    ...data.following,
    ...data.following,
    ...data.following,
  ];
  // const following = undefined;
  console.log("mm: ", data);

  return (
    <section className="w-full flex justify-center items-center gap-3 py-4 px-5 bg-neutral-50 shadow-sm mb-5 shadow-neutral-300 rounded-lg min-h-[90px] overflow-x-auto">
      {isLoading ? (
        <div className="flex w-full h-full justify-center items-center">
          <PropagateLoader color="#3dab2d" />
        </div>
      ) : (
        !following?.length && <>{`You don't have followings`}</>
      )}

      <ScrollableBar>
        {following?.map(({ username, image }) => (
          <figure
            key={username}
            className="flex flex-col items-center w-20 min-w-20"
          >
            <Avatar user={{ username, image }} />
            <p className="w-full text-sm text-center text-ellipsis overflow-hidden">
              {username}
            </p>
          </figure>
        ))}
      </ScrollableBar>
    </section>
  );
};

export default StoryList;
