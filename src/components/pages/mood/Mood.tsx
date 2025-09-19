'use client';

import MoodResult from './MoodResult';
import MoodSurvey from './MoodSurvey';
import { MoodType } from '@/constants/mood';

type MoodProps = {
  myMood?: MoodType | null;
  moodData?: {
    [key in MoodType]: number;
  };
};

const Mood = ({ myMood, moodData }: MoodProps) => {
  return myMood ? (
    <MoodResult
      myMood={myMood}
      moodData={moodData}
    />
  ) : (
    <MoodSurvey />
  );
};

export default Mood;
