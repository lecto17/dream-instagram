"use client";
import PostGrid from "@/components/posts/PostGrid";
import CacheKeyContext from "@/context/CacheKeyContext";
import { useState } from "react";

type Props = {
  username: string;
};

const ProfileMenus = ["posts", "saved", "liked"] as const;

const UserProfileTab = ({ username }: Props) => {
  const [activeMenu, setActiveMenu] = useState<(typeof ProfileMenus)[number]>(
    ProfileMenus[0]
  );

  const handleClickMenu = async (e: React.MouseEvent) => {
    const menu = e.currentTarget.textContent as (typeof ProfileMenus)[number];
    if (menu) {
      setActiveMenu(menu);
    }
  };

  return (
    <section className="w-full flex flex-col justify-center items-center relative">
      <ul className="flex w-full justify-center space-x-24 border-t border-gray-300 mb-5">
        {ProfileMenus.map((menu) => (
          <li
            key={menu}
            className={`h-16 px-5 flex justify-center items-center cursor-pointer text-lg ${menu === activeMenu && "border-t-[1px] border-gray-500 font-semibold"}`}
            onClick={handleClickMenu}
          >
            {menu}
          </li>
        ))}
      </ul>
      <CacheKeyContext.Provider
        value={{ postsKey: `/api/users/${username}/${activeMenu}` }}
      >
        <PostGrid />
      </CacheKeyContext.Provider>
    </section>
  );
};

export default UserProfileTab;
