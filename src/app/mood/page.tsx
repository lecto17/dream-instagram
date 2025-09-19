import Mood from '@/components/pages/mood/Mood';
import { getMyMood } from '@/service/supa-mood';

const MoodPage = async () => {
  // const myMood = await getMyMood();
  // return <Mood myMood={myMood} />;
  return <Mood myMood={null} />;
};

export default MoodPage;
