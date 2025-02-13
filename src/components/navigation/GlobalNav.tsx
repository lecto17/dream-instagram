"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import { BsPlusSquare } from "react-icons/bs";
import { BsPlusSquareFill } from "react-icons/bs";
import { RiSearchLine } from "react-icons/ri";
import { RiSearchFill } from "react-icons/ri";

const MENUS = [
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
  //   {
  //     url: "/signin",
  //     Icon: "",
  //   },
];

const GlobalNav = () => {
  const pathName = usePathname();

  return (
    <section className="flex justify-between py-3 px-5">
      <Link href="/" className="text-3xl font-semibold">
        Instagram
      </Link>
      <ul className="flex gap-4">
        {MENUS.map(({ url, Icon, ActiveIcon }) => (
          <li key={url} className="text-3xl">
            <Link href={url}>
              {url === pathName ? <ActiveIcon /> : <Icon />}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default GlobalNav;
