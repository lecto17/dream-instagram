"use client";
import Loading from "@/components/loading/Loading";
import PostModal from "@/components/modal/PostModal";
import ModalPortal from "@/components/portal/ModalPortal";
import PostDetail from "@/components/posts/PostDetail";
import { SimplePost } from "@/types/post";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
// import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

type Props = {
  propUserName: string;
};

const ProfileMenus = ["POSTS", "SAVED", "LIKED"] as const;

const UserProfileTab = ({ propUserName }: Props) => {
  const { data: session } = useSession();
  const [showable, setShowable] = useState(false);
  const [activeMenu, setActiveMenu] = useState<(typeof ProfileMenus)[number]>(
    ProfileMenus[0]
  );

  const [profileData, setProfileData] = useState({
    POSTS: [],
    SAVED: [],
    LIKED: [],
  });

  const { data, isLoading } = useSWR(
    `/api/users/${propUserName}/${activeMenu}`
  );

  const handleClickMenu = async (e: React.MouseEvent) => {
    const menu = e.currentTarget.textContent as (typeof ProfileMenus)[number];
    if (menu) {
      setActiveMenu(menu);
    }
  };

  const handleLClickPost = () => {
    if (!session?.user) {
      redirect("/auth/login");
    }
    setShowable(true);
  };

  useEffect(() => {
    setProfileData((prev) => ({
      ...prev,
      [activeMenu]: data,
    }));
  }, [data, activeMenu]);

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
      {isLoading && <Loading />}
      <ul className="w-full mx-auto grid gap-2 grid-cols-3">
        {profileData[activeMenu]?.map(
          (
            {
              image,
              id,
              createdAt,
              likes,
              text,
              userImage,
              username,
            }: SimplePost,
            idx
          ) => (
            <li
              key={id + "-" + idx}
              className="cursor-pointer"
              onClick={handleLClickPost}
              data-id={id}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={propUserName + "'s article"}
                className="aspect-square object-cover"
              />
              {showable && (
                <ModalPortal>
                  <PostModal onClose={() => setShowable(false)}>
                    <PostDetail
                      key={id}
                      id={id}
                      createdAt={createdAt}
                      image={image}
                      likes={likes}
                      text={text}
                      userImage={userImage}
                      username={username}
                    />
                  </PostModal>
                </ModalPortal>
              )}
            </li>
          )
        )}
      </ul>
      {!data || (!Object.keys(data).length && <div>No-data</div>)}
    </section>
  );
};

export default UserProfileTab;
