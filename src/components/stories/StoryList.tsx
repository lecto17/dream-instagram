"use client";
import useSWR from "swr";
import PropagateLoader from "react-spinners/PropagateLoader";
import { client } from "@/sanity/sanity";
import { getQuery } from "@/service/fetch";
import { User } from "@/types/user";
import Avatar from "@/components/avatar/Avatar";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState } from "react";

interface StoryListProps {
  userName: string;
}

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const fetcher = async (query: string) => await client.fetch(query);
const StoryList = ({ userName }: StoryListProps) => {
  const { data, isLoading } = useSWR<User[] | []>(
    getQuery("FOLLOWINGS", userName),
    fetcher,
    {
      revalidateOnFocus: false, // 포커스될 때 자동 리패치 비활성화
    }
  );

  return (
    <section className="flex w-full gap-3 py-4 px-5 bg-neutral-50 shadow-md rounded-sm min-h-14">
      {isLoading ? (
        <div className="flex w-full h-full justify-center items-center">
          <PropagateLoader color="#3dab2d" />{" "}
        </div>
      ) : (
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          // ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={false}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          transitionDuration={500}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {Array.from({length: 10}).fill(data).map(() => (
            user <Avatar key={user.id} user={user} />
          ))}
        </Carousel>
      )}
    </section>
  );
};

export default StoryList;
