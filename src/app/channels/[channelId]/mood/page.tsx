import Mood from '@/components/pages/mood/Mood';
import { getMyMood } from '@/service/supa-mood';
import { getAuthenticatedUser, getValidationOnChannel } from '@/actions/action';
import { redirect } from 'next/navigation';
import { getDateYYYYMMDDWithDash } from '@/utils/utils';

const MoodPage = async ({
  params,
}: {
  params: Promise<{ channelId: string }>;
}) => {
  const user = await getAuthenticatedUser();
  if (!user) return redirect('/auth/login');

  const { channelId } = await params;

  // 채널 전반 유효성 검사
  await getValidationOnChannel(channelId, user.id);

  const date = getDateYYYYMMDDWithDash();
  const data = await getMyMood(channelId, user.id, date);
  const myMood = data?.length > 0 ? data[0] : null;

  return (
    <Mood
      channelId={channelId}
      myMood={myMood}
    />
  );
};

export default MoodPage;
