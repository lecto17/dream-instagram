import React from 'react';
import MoodResult from '@/components/pages/mood/MoodResult';
import { redirect } from 'next/navigation';
import {
  getAuthenticatedUser,
  getAuthenticatedUserSession,
} from '@/actions/action';
import { getAppUrl } from '@/utils/env';

const MoodResponsePage = async () => {
  const user = await getAuthenticatedUser();
  if (!user) return redirect('/auth/login');

  const userSession = await getAuthenticatedUserSession();

  const url = `${getAppUrl()}/api/mood/response`;
  const data = await fetch(url, {
    headers: {
      Authorization: `Bearer ${userSession?.access_token}`,
    },
  });
  const { moodCountsResult, myMood, totalCounts } = await data.json();
  console.log('moodCountsResult', moodCountsResult);
  console.log('myMood', myMood);

  if (myMood === null) return redirect('/mood');

  return (
    <MoodResult
      moodData={moodCountsResult}
      myMood={myMood}
      totalCounts={totalCounts}
    />
  );
};

export default MoodResponsePage;
