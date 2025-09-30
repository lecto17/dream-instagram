import { getAuthenticatedUser } from '@/actions/action';
import { addMyMood } from '@/service/supa-mood';
import { moodMapper } from '@/constants/mood';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) return new Response('UnAuthenticated Error');

  const { mood, channelId } = await request.json();

  console.log('mood route channelId', channelId);

  if (channelId == null) {
    return new Response('ChannelId is required', { status: 400 });
  }

  // TODO: Mood Mapper는 추후 관리자 페이지에서 동적으로 수정할 수 있도록 변경할 것
  const moodValue = moodMapper.get(mood) || 0;

  if (moodValue === 0) {
    return new Response('Invalid mood', { status: 400 });
  }

  await addMyMood(moodValue, channelId, user.id);
  return new Response(JSON.stringify({ message: 'success' }), { status: 200 });
}
