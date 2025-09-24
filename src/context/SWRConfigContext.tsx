'use client';

import { SupaUserProfile } from '@/types/user';
import { User } from '@supabase/supabase-js';
import { SWRConfig } from 'swr';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  fallback?: Record<string, unknown>;
  user?: User;
  profile?: SupaUserProfile;
};

const SWRConfigContext = ({ children, fallback, user, profile }: Props) => {
  const initialData = {
    ...fallback,
    // 사용자 정보 캐시
    ...(user && { '/api/me': user }),
    // 프로필 정보 캐시
    ...(profile && user && { [`/api/profile/${user.id}`]: profile }),
  };

  return (
    <SWRConfig
      value={{
        fetcher: async (query: string) =>
          await fetch(query).then((res) => res.json()),
        // (resource, init) => fetch(resource, init).then((res) => res.json()),
        revalidateOnFocus: false, // SWR의 기본 설정은 탭을 이동했다 돌아오면 자동으로 다시 요청
        fallback: initialData,
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRConfigContext;
