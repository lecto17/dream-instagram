"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactElement } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import { BsPlusSquare } from "react-icons/bs";
import { BsPlusSquareFill } from "react-icons/bs";
import { RiSearchLine } from "react-icons/ri";
import { RiSearchFill } from "react-icons/ri";

import InstagramBorder from "@/components/border/InstagramBorder";
import { useSession, signIn, signOut } from "next-auth/react";

interface MENU {
  url: string;
  Icon: () => ReactElement;
  ActiveIcon: () => ReactElement;
}

const MENUS: MENU[] = [
  {
    url: "/",
    Icon: () => <AiOutlineHome />,
    ActiveIcon: () => <AiFillHome />,
  },
  {
    url: "/search",
    Icon: () => <RiSearchLine />,
    ActiveIcon: () => <RiSearchFill />,
  },
  {
    url: "/new",
    Icon: () => <BsPlusSquare />,
    ActiveIcon: () => <BsPlusSquareFill />,
  },
];

const GlobalNav = () => {
  const pathName = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  const handleClickIsLogined = () => {
    if (user) {
      signOut();
      return;
    }
    signIn();
  };

  const getMenuIcon = ({ url, Icon, ActiveIcon }: MENU) => {
    return url === pathName ? <ActiveIcon /> : <Icon />;
  };

  const getCompnentWhenLogined = () => {
    if (user) {
      return (
        <>
          <InstagramBorder className="w-10 h-10">
            <Link href={""}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user.image || undefined}
                className="object-cover h-full rounded-full"
                alt="profile image"
                fetchPriority="high"
                referrerPolicy="no-referrer"
              />
            </Link>
          </InstagramBorder>
          <InstagramBorder rounded={"rounded-md"} padding="p-[2px]">
            <button className="min-w-[80px]" onClick={handleClickIsLogined}>
              logout
            </button>
          </InstagramBorder>
        </>
      );
    }

    return (
      <InstagramBorder rounded={"rounded-md"} padding="p-[2px]">
        <button className="min-w-[80px]" onClick={handleClickIsLogined}>
          login
        </button>
      </InstagramBorder>
    );
  };

  return (
    <section className="sticky top-0 z-10 flex justify-between items-center py-3 px-2 md:px-6 border-b">
      <Link href="/" className="text-xl font-semibold md:text-3xl">
        Instagram
      </Link>
      <ul className="flex gap-4 items-center pl-4 h-10">
        {MENUS.map((menu) => (
          <li key={menu.url} className="text-3xl">
            <Link href={menu.url}>{getMenuIcon(menu)}</Link>
          </li>
        ))}
        {getCompnentWhenLogined()}
      </ul>
    </section>
  );
};

export default GlobalNav;
