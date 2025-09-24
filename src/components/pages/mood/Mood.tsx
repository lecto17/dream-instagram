import MoodSurvey from './MoodSurvey';
import { MoodType } from '@/constants/mood';
import { redirect } from 'next/navigation';

type MoodProps = {
  myMood?: MoodType | null;
  moodData?: {
    [key in MoodType]: number;
  };
};

const Mood = ({ myMood, moodData }: MoodProps) => {
  if (myMood != null) {
    redirect('/mood/response');
  }
  return <MoodSurvey />;
};

export default Mood;
