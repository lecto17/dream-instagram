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
import Avatar from "@/components/avatar/Avatar";

interface MENU {
  url: string;
  name: string;
  Icon: () => ReactElement;
  ActiveIcon: () => ReactElement;
}

const MENUS: MENU[] = [
  {
    url: "/",
    Icon: () => <AiOutlineHome />,
    ActiveIcon: () => <AiFillHome />,
    name: "home icon",
  },
  {
    url: "/search",
    Icon: () => <RiSearchLine />,
    ActiveIcon: () => <RiSearchFill />,
    name: "search users icon",
  },
  {
    url: "/new",
    Icon: () => <BsPlusSquare />,
    ActiveIcon: () => <BsPlusSquareFill />,
    name: "post new article icon",
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

    signIn("google", {
      redirectTo: pathName === "/auth/login" ? "/" : pathName,
    });
  };

  const getMenuIcon = ({ url, Icon, ActiveIcon }: MENU) => {
    return url === pathName ? <ActiveIcon /> : <Icon />;
  };

  const getCompnentWhenLogined = () => {
    if (user) {
      return (
        <>
          <Avatar user={user} size="small" />
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
    <section className="sticky top-0 z-10 flex justify-between items-center py-3 px-2 md:px-6 border-b shadow-sm bg-white">
      <Link href="/" className="text-xl font-semibold md:text-3xl">
        Instagram
      </Link>
      <div className="flex items-center space-x-2">
        <ul className="flex gap-4 items-center pl-4 h-10 mr-5">
          {MENUS.map((menu) => (
            <li key={menu.url} className="text-3xl">
              <Link href={menu.url} aria-label={menu.url}>
                {getMenuIcon(menu)}
              </Link>
              <span className="sr-only">{menu.name}</span>
            </li>
          ))}
        </ul>
        {getCompnentWhenLogined()}
      </div>
    </section>
  );
};

export default GlobalNav;
