import MoodSurvey from './MoodSurvey';
import { MoodType } from '@/constants/mood';
import { redirect } from 'next/navigation';

type MoodProps = {
  myMood: MoodType | null;
  channelId: string;
};

const Mood = ({ myMood, channelId }: MoodProps) => {
  if (myMood != null) {
    redirect(`/channels/${channelId}/mood/response`);
  }
  return <MoodSurvey channelId={channelId} />;
};

export default Mood;
