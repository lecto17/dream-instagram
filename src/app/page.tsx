// import StoryList from '@/components/stories/StoryList';
import PostList from '@/components/posts/PostList';
import AvatarLocalNav from '@/components/navigation/AvatarLocalNav';
import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '@/actions/action';
import DateList from '@/components/date/DateList';
import { getDateYYYYMMDDWithDash, isValidDate } from '@/utils/utils';

type HomePageProps = {
  searchParams: { date?: string };
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const user = await getAuthenticatedUser();
  if (user == null) return redirect('/auth/login');

  // URL에서 date 파라미터 가져오기
  const dateParam = searchParams.date;

  // date 파라미터가 없거나 유효하지 않으면 오늘 날짜로 리다이렉트
  if (!dateParam || !isValidDate(dateParam)) {
    const today = getDateYYYYMMDDWithDash().replaceAll('-', '');
    return redirect(`/?date=${today}`);
  }

  /**
   * TODO
   * 오늘 날짜에 해당하는 게시글 SSR 처리
   */

  return (
    <section className="w-full h-full flex flex-col sm:flex-row max-w-[850px]">
      <div className="w-full h-full flex flex-col basis-3/4 overflow-hidden bg-gray-100">
        {/* <StoryList /> */}
        <DateList />
        <PostList />
      </div>
      <div className="hidden sm:block basis-1/4 ml:8">
        <AvatarLocalNav user={user} />
      </div>
    </section>
  );
}
