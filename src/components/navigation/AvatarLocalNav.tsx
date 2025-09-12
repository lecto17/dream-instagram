'use client';
import Avatar from '@/components/avatar/Avatar';

import { getNameByEmail } from '@/utils/utils';
import { User } from '@supabase/supabase-js';
import useUser from '@/hooks/useUser';

interface AvatarLocalNavProps {
  user: User;
}

const AvatarLocalNav = ({ user }: AvatarLocalNavProps) => {
  const { user: userProfile } = useUser();

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
          <span className="text-gray-500 text-lg">{userProfile?.userName}</span>
        </p>
      </div>
    </section>
  );
};

export default AvatarLocalNav;
