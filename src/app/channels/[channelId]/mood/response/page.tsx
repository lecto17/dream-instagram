import React from 'react';
import MoodResult from '@/components/pages/mood/MoodResult';
import { redirect } from 'next/navigation';
import {
  getAuthenticatedUser,
  getAuthenticatedUserSession,
} from '@/actions/action';
import { getMoodStatistics } from '@/service/supa-mood';
import { moodMapper } from '@/constants/mood';
import { getKeyByValue } from '@/utils/utils';

const MoodResponsePage = async ({
  params,
}: {
  params: Promise<{ channelId: string }>;
}) => {
  const user = await getAuthenticatedUser();
  if (!user) return redirect('/auth/login');

  const { channelId } = await params;
  if (channelId == null) return redirect('/channels');

  const userSession = await getAuthenticatedUserSession();

  // const url = `${getAppUrl()}/api/mood/response?channelId=${channelId}`;
  // const data = await fetch(url, {
  //   headers: {
  //     Authorization: `Bearer ${userSession?.access_token}`,
  //   },
  // });

  const data = await getMoodStatistics(user.id, channelId);
  const { moodCountsResult, myMood, totalCounts } = data;

  if (myMood === null) return redirect(`/channels/${channelId}/mood`);

  const formattedMoodCountsResult = data.moodCountsResult.map((item) => {
    const key = parseInt(Object.keys(item)[0] || '0');
    return {
      [getKeyByValue(moodMapper, key) as string]: item[key],
    };
  });

  const formattedData = {
    moodCountsResult: Object.assign({}, ...formattedMoodCountsResult),
    myMood: getKeyByValue(moodMapper, data.myMood || 0),
    totalCounts: data.totalCounts,
  };

  return (
    <MoodResult
      moodData={formattedData.moodCountsResult}
      myMood={formattedData.myMood || undefined}
      totalCounts={totalCounts}
    />
  );
};

export default MoodResponsePage;
