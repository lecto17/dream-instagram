"use client";

import InstagramBorder from "@/components/border/InstagramBorder";
import { User } from "@/types/user";
import { getNameByEmail } from "@/utils/utils";
import Link from "next/link";

interface AvatarProps {
  user: User;
  border?: boolean;
  size?: "small" | "middle" | "big";
}

const Avatar = ({ user, border = true, size = "small" }: AvatarProps) => {
  console.log("user ", user);

  const ImageContent = () => {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={
          user?.image ||
          "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"
        }
        alt="profile image"
        referrerPolicy="no-referrer"
        className={`rounded-full w-10 h-10 ${size === "middle" ? "w-11 h-11" : "w-[52px] h-[52px]"}`}
      />
    );
  };
  return (
    <Link href={`/users/${getNameByEmail(user?.email)}`}>
      {border ? (
        <InstagramBorder>
          <ImageContent />
        </InstagramBorder>
      ) : (
        <ImageContent />
      )}
    </Link>
  );
};

export default Avatar;
