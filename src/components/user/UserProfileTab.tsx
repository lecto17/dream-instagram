"use client";
import Loading from "@/components/loading/Loading";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

type Props = {
  propUserName: string;
};

const ProfileMenus = ["POSTS", "SAVED", "LIKED"] as const;

const UserProfileTab = ({ propUserName }: Props) => {
  const [activeMenu, setActiveMenu] = useState<(typeof ProfileMenus)[number]>(
    ProfileMenus[0]
  );

  const [profileData, setProfileData] = useState({
    POSTS: [],
    SAVED: [],
    LIKED: [],
  });

  const { data, isLoading, error } = useSWR(
    `/api/users/${propUserName}/${activeMenu}`
  );

  const handleClickMenu = async (e: React.MouseEvent) => {
    const menu = e.currentTarget.textContent as (typeof ProfileMenus)[number];
    if (menu) {
      setActiveMenu(menu);
    }
  };

  useEffect(() => {
    setProfileData((prev) => ({
      ...prev,
      [activeMenu]: data,
    }));
  }, [data, activeMenu]);

  if (!data || !Object.keys(data).length) return <>데이터 없음</>;

  return (
    <section className="w-full flex flex-col justify-center items-center">
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
      {isLoading && <Loading />}
      <ul className="w-full mx-auto grid gap-2 grid-cols-3">
        {profileData[activeMenu]?.map(({ image, id }) => (
          <li key={id} className="cursor-pointer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={propUserName + "'s article"}
              className="aspect-square object-cover"
            />
            <Link href={"/"}></Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UserProfileTab;
