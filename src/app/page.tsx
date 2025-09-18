import { redirect } from 'next/navigation';
import { getDateYYYYMMDDWithDash, isValidDate } from '@/utils/utils';
import Home from '@/components/pages/Home';
import { getAuthenticatedUser } from '@/actions/action';
import { getMyProfile } from '@/service/supa-user';

type HomePageProps = {
  searchParams: Promise<{ date: string }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const user = await getAuthenticatedUser();
  if (!user) return redirect('/auth/login');

  const profile = await getMyProfile(user.id);
  if (profile == null || profile?.userName == null) {
    return redirect('/onboarding');
  }

  // URL에서 date 파라미터 가져오기
  const { date: dateParam } = await searchParams;

  // date 파라미터가 없거나 유효하지 않으면 오늘 날짜로 리다이렉트
  if (!dateParam || !isValidDate(dateParam)) {
    const today = getDateYYYYMMDDWithDash().replaceAll('-', '');
    return redirect(`?date=${today}`);
  }

  /**
   * TODO
   * 오늘 날짜에 해당하는 게시글 SSR 처리
   */

  return <Home />;
}
