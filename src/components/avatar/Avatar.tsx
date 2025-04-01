"use client";

import InstagramBorder from "@/components/border/InstagramBorder";
import { SimpleUser, User } from "@/types/user";
import Link from "next/link";
import { memo } from "react";

export type AvatarSize = "xs" | "small" | "middle" | "big" | "ultra";

interface AvatarProps {
  user: User | SimpleUser;
  border?: boolean;
  size?: AvatarSize;
  isLink?: boolean;
}

const Avatar = memo(function Avatar({
  user,
  border = true,
  size,
  isLink = true,
}: AvatarProps) {
  const getImageSizeStyle = (size: AvatarSize) => {
    switch (size) {
      case "xs":
        return "w-7 h-7";
      case "small":
        return "w-9 h-9";
      case "middle":
        return "w-11 h-11";
      case "big":
        return "w-[52px] h-[52px]";
      case "ultra":
        return "w-28 h-28";
      default:
        return "w-9 h-9";
    }
  };
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
        className={`rounded-full flex object-cover ${getImageSizeStyle(size || "middle")}`}
      />
    );
  };

  /**
   * 합성 컴포넌트로 바꾸기
   * Border, username 등 경우의 수를 전부 대응해줄 수는 없기에.
   * */
  return isLink ? (
    <Link
      className="w-fit"
      href={`/users/${user.username ?? ("name" in user && user.name)}`}
    >
      {border ? (
        <InstagramBorder>
          <ImageContent />
        </InstagramBorder>
      ) : (
        <ImageContent />
      )}
    </Link>
  ) : (
    <ImageContent />
  );
});

export default Avatar;
