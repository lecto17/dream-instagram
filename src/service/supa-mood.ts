import { serverSupabase } from '@/lib/supabaseServerClient';
import { MOOD } from '@/types/mood';

export const getMyMood = async (userId: string) => {
  const client = await serverSupabase();
  const { data, error } = await client
    .from('moods')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;
  return data;
};

export const addMyMood = async (mood: number, userId: string) => {
  const client = await serverSupabase();
  const { data, error } = await client
    .from('moods')
    .insert({ mood, user_id: userId });
  if (error) throw error;
  return data;
};

export const getMoodStatistics = async (userId: string) => {
  const client = await serverSupabase();
  // 오늘 날짜 (Asia/Seoul 타임존 기준)
  const today = new Date();
  const seoulDate = new Date(
    today.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
  );
  const startOfDay = new Date(
    seoulDate.getFullYear(),
    seoulDate.getMonth(),
    seoulDate.getDate(),
  );
  const endOfDay = new Date(
    seoulDate.getFullYear(),
    seoulDate.getMonth(),
    seoulDate.getDate() + 1,
  );

  const { data, error }: { data: MOOD[] | null; error: Error | null } =
    await client
      .from('moods')
      .select('*')
      .gte('created_at', startOfDay.toISOString())
      .lt('created_at', endOfDay.toISOString());

  if (error) throw error;
  if (data == null || data.length === 0)
    return { moodCountsResult: [], myMood: null, totalCounts: 0 };

  // 내 기분 조회
  const myMood = data.find((item) => item.user_id === userId)?.mood;

  // 무드별 투표 수 집계
  const moodCounts = data.reduce((acc, item) => {
    acc[`${item.mood}`] = (acc[`${item.mood}`] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  // 배열로 변환하고 투표 수 기준 내림차순 정렬
  const moodCountsResult = Object.entries(moodCounts).map(([key, value]) => ({
    [key]: value,
  }));

  return { moodCountsResult, myMood, totalCounts: data.length };
};
