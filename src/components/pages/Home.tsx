'use client';
import DateList from '../date/DateList';
import PostList from '../posts/PostList';
import AvatarLocalNav from '../navigation/AvatarLocalNav';
import useUser from '@/hooks/useUser';
import useSWR from 'swr';

export default function Home() {
  const { user } = useUser();

  // SWR로 프로필 정보 가져오기 (캐시에서 즉시 로드)
  const { data: profile, isLoading: profileLoading } = useSWR(
    user?.id ? `/api/profile/${user.id}` : null,
  );

  if (profileLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <section className="w-full h-full flex flex-col sm:flex-row max-w-[850px]">
      <div className="w-full h-full flex flex-col basis-3/4 overflow-hidden bg-gray-100">
        {/* <StoryList /> */}
        <DateList />
        <PostList />
      </div>
      <div className="hidden sm:block basis-1/4 ml:8">
        <AvatarLocalNav />
      </div>
    </section>
  );
}
