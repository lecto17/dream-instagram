"use client";
import PropagateLoader from "react-spinners/PropagateLoader";
import Avatar from "@/components/avatar/Avatar";

import "react-multi-carousel/lib/styles.css";
import ScrollableBar from "@/components/carousel/ScrollableBar";
import { LOADING_BAR_COLOR } from "@/constants/color";
import useUser from "@/hooks/useUser";

const StoryList = () => {
  const { user, isLoading } = useUser();
  const following = user?.following && [...user.following, ...user.following];

  return (
    <section className="w-full flex justify-center items-center gap-3 py-4 px-5 bg-neutral-50 shadow-sm mb-5 shadow-neutral-300 rounded-lg min-h-[90px] overflow-x-auto relative z-0">
      {isLoading ? (
        <div className="flex w-full h-full justify-center items-center">
          <PropagateLoader color={LOADING_BAR_COLOR} />
        </div>
      ) : !following?.length ? (
        <>{`You don't have followings`}</>
      ) : (
        <ScrollableBar>
          {following?.map(({ username, image }) => (
            <figure
              key={username}
              className="flex flex-col items-center w-20 min-w-20"
            >
              <Avatar user={{ username, image }} size="big" />
              <p className="w-full text-sm text-center text-ellipsis overflow-hidden">
                {username}
              </p>
            </figure>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
};

export default StoryList;
