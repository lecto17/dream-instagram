import { getAuthenticatedUser } from '@/actions/action';
import { addMyMood } from '@/service/supa-mood';
import { moodMapper } from '@/constants/mood';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) return new Response('UnAuthenticated Error');

  const { mood } = await request.json();
  // TODO: Mood Mapper는 추후 관리자 페이지에서 동적으로 수정할 수 있도록 변경할 것
  const moodValue = moodMapper.get(mood) || 0;

  if (moodValue === 0) {
    return new Response('Invalid mood', { status: 400 });
  }

  const moodData = await addMyMood(moodValue, user.id);
  return new Response(JSON.stringify(moodData), { status: 200 });
}
