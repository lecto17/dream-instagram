"use client";

import Avatar from "@/components/avatar/Avatar";
import ScrollableBar from "@/components/carousel/ScrollableBar";
import useRecommendUsers from "@/hooks/useRecommendUsers";

const RecommendUsers = () => {
  const { recommendUsers } = useRecommendUsers();

  return (
    <>
      {recommendUsers?.length ? (
        <article className="flex flex-col w-full border rounded-md p-4 shadow-md">
          <span className="font-semibold mb-4">You may know</span>
          <ScrollableBar>
            {recommendUsers?.map(({ image, username, id }, idx) => (
              <figure
                key={`${id}-${idx}`}
                className="flex flex-col justify-center items-center mr-2 px-1"
              >
                <Avatar user={{ image, username }} />
                <span className="text-sm">{username}</span>
              </figure>
            ))}
          </ScrollableBar>
        </article>
      ) : (
        <></>
      )}
    </>
  );
};

export default RecommendUsers;
