import { objectMapper } from '@/utils/mapper';
import { SupaUserProfile } from '@/types/user';
import { serverSupabase } from '@/lib/supabaseServerClient';

export const getMyProfile = async (
  userId: string,
  channelId: string,
): Promise<SupaUserProfile> => {
  const client = await serverSupabase();

  // 먼저 해당 채널의 프로필이 있는지 확인
  const { data: profile, error: existingError } = await client
    .from('channel_members')
    .select('*')
    .eq('user_id', userId)
    .eq('channel_id', channelId);

  if (existingError) throw existingError;

  // 이미 해당 채널의 프로필이 있으면 반환
  // if (existingProfile && existingProfile.length > 0) {
  //   return existingProfile.map(objectMapper)[0] as SupaUserProfile;
  // }

  // 해당 채널의 프로필이 없으면, channel_id가 null인 row를 찾아서 업데이트
  // const { data: nullChannelProfile, error: nullError } = await client
  //   .from('user_profiles')
  //   .select('*')
  //   .eq('id', userId)
  //   .is('channel_id', null)
  //   .limit(1);

  // if (nullError) throw nullError;

  // if (nullChannelProfile && nullChannelProfile.length > 0) {
  //   // channel_id가 null인 row를 찾았으면 해당 채널로 업데이트
  //   const { error: updateError } = await client
  //     .from('user_profiles')
  //     .update({ channel_id: channelId })
  //     .eq('id', nullChannelProfile[0].id);

  //   if (updateError) throw updateError;

  //   return [
  //     {
  //       ...nullChannelProfile[0],
  //       channel_id: channelId,
  //     },
  //   ].map(objectMapper)[0] as SupaUserProfile;
  // }

  // channel_id가 null인 row도 없으면 새로 생성
  // const { data: newProfile, error: insertError } = await client
  //   .from('user_profiles')
  //   .insert({
  //     id: userId,
  //     channel_id: channelId,
  //     user_name: 'Unknown User',
  //     avatar_url: null,
  //   })
  //   .select()
  //   .single();

  // if (insertError) throw insertError;

  return profile.map(objectMapper)[0] as SupaUserProfile;
};

export const updateUserProfile = async (
  userId: string,
  channelId: string,
  userName: string,
  avatarUrl?: string,
) => {
  const client = await serverSupabase();
  const { error } = await client
    .from('channel_members')
    .update({
      user_name: userName,
      avatar_url: avatarUrl,
    })
    .eq('user_id', userId)
    .eq('channel_id', channelId);

  if (error) throw error;
};
