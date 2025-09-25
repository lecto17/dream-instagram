import MoodSurvey from './MoodSurvey';
import { MoodType } from '@/constants/mood';
import { redirect } from 'next/navigation';

type MoodProps = {
  myMood: MoodType | null;
};

const Mood = ({ myMood }: MoodProps) => {
  if (myMood != null) {
    redirect('/mood/response');
  }
  return <MoodSurvey />;
};

export default Mood;
