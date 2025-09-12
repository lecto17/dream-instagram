'use client';
import Avatar from '@/components/avatar/Avatar';

import { getNameByEmail } from '@/utils/utils';
import { User } from '@supabase/supabase-js';
import { SupaUserProfile } from '@/types/user';

interface AvatarLocalNavProps {
  user: User & { profile: SupaUserProfile };
}

const AvatarLocalNav = ({ user }: AvatarLocalNavProps) => {
  return (
    <section className="flex flex-col py-5 items-center">
      <div className="flex items-center">
        <Avatar
          user={user}
          border={false}
          size="middle"
        />
        <p className="ml-4 text-base leading-3">
          <span className="block font-semibold">
            {getNameByEmail(user.email)}
          </span>
          <span className="text-gray-500 text-lg">{user.profile.userName}</span>
        </p>
      </div>
    </section>
  );
};

export default AvatarLocalNav;
