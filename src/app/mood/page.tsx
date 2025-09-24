import Mood from '@/components/pages/mood/Mood';
import { getMyMood } from '@/service/supa-mood';
import { getAuthenticatedUser } from '@/actions/action';
import { redirect } from 'next/navigation';

const MoodPage = async () => {
  const user = await getAuthenticatedUser();
  if (!user) return redirect('/auth/login');

  const data = await getMyMood(user.id);
  const myMood = data?.length > 0 ? data[0] : null;

  return <Mood myMood={myMood} />;
};

export default MoodPage;
