'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { ReactElement, useState } from 'react';
import { BsPlusSquare } from 'react-icons/bs';

import Avatar from '@/components/avatar/Avatar';
import { SupaUserProfile } from '@/types/user';
import Dropdown from '../dropdown/Dropdown';
import { FaSignOutAlt, FaVoteYea } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';

interface MENU {
  name: 'post' | 'profile';
  Icon: (data?: unknown) => ReactElement;
}

const MENUS: MENU[] = [
  {
    Icon: () => <BsPlusSquare />,
    name: 'post',
  },
  {
    Icon: (data?: unknown) => (
      <Avatar
        user={data as SupaUserProfile}
        size="small"
      />
    ),
    name: 'profile',
  },
];

const GlobalNav = ({ user }: { user: SupaUserProfile | null }) => {
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // const { data: session } = useSession();
  // const user = session?.user;
  // const user = createClient().auth.getUser();

  const triggerDropdown = (type: 'post' | 'profile') => {
    setActiveDropdown((prev) => (prev === type ? null : type));
  };

  const getDropdownMenu = (type: 'post' | 'profile') => {
    if (activeDropdown === 'post' && type === 'post') {
      return (
        <div className="absolute top-full right-0">
          <Dropdown
            options={[
              {
                label: (
                  <div className="flex items-center gap-2">
                    <FaVoteYea />
                    <span>게시글</span>
                  </div>
                ),
                value: 'post',
                onClick: () => {
                  setActiveDropdown(null);
                  router.push('/post');
                },
              },
              {
                label: (
                  <div className="flex items-center gap-2">
                    <FaVoteYea />
                    <span>무드</span>
                  </div>
                ),
                value: 'vote',
                onClick: () => {
                  setActiveDropdown(null);
                  router.push('/mood');
                },
              },
            ]}
          />
        </div>
      );
    } else if (activeDropdown === 'profile' && type === 'profile') {
      return (
        <div className="absolute top-full right-0">
          <Dropdown
            options={[
              {
                label: (
                  <div className="flex items-center gap-2">
                    <FaUser />
                    <span>프로필</span>
                  </div>
                ),
                value: 'profile',
                onClick: () => {
                  setActiveDropdown(null);
                  router.push('/profile');
                },
              },
              {
                label: (
                  <div className="flex items-center gap-2">
                    <FaSignOutAlt />
                    <span className="text-red-500">로그아웃</span>
                  </div>
                ),
                value: 'logout',
                onClick: () => {
                  setActiveDropdown(null);
                },
              },
            ]}
          />
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <section className="sticky top-0 z-10 flex justify-between items-center py-3 px-2 md:px-6 border-b shadow-sm bg-white">
      <Link
        href="/"
        className="text-xl font-semibold md:text-3xl"
        onClick={() => setActiveDropdown(null)}
      >
        Our Voice
      </Link>
      <div className="flex items-center space-x-4">
        <ul className="flex gap-4 items-center">
          {MENUS.map((menu) => (
            <li
              key={menu.name}
              className="text-3xl relative"
            >
              <div
                aria-label={menu.name}
                onClick={() => triggerDropdown(menu.name)}
              >
                {menu.Icon(user)}
              </div>
              <span className="sr-only">{menu.name}</span>
              {getDropdownMenu(menu.name)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default GlobalNav;
