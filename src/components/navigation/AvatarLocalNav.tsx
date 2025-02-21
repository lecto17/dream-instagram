"use client";
import Avatar from "@/components/avatar/Avatar";
import { User } from "@/types/user";
import { getNameByEmail } from "@/utils/utils";

interface AvatarLocalNavProps {
  user: User;
}

const AvatarLocalNav = ({ user }: AvatarLocalNavProps) => {
  return (
    <section className="flex flex-col py-5 items-center">
      <div className="flex items-center">
        <Avatar user={user} border={false} size="middle" />
        <p className="ml-4 text-base leading-3">
          <span className="block font-semibold">
            {getNameByEmail(user.email)}
          </span>
          <span className="text-gray-300 text-lg">{user.name}</span>
        </p>
      </div>
    </section>
  );
};

export default AvatarLocalNav;
