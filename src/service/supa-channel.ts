import { serverSupabase } from '@/lib/supabaseServerClient';
import {
  Channel,
  CreateChannelRequest,
  JoinChannelRequest,
} from '@/types/channel';
import bcrypt from 'bcrypt';
import { objectMapper } from '@/utils/mapper';

// 모든 채널 목록 조회
export async function getAllChannels(userId?: string): Promise<Channel[]> {
  const supabase = await serverSupabase();

  /**
   * GOAL: 기본적으로 is_private가 false인 채널을 가져오되, private한 채널이여도 자신이 참여한 채널이면 출력
   * CASE 1: DB에서 채널의 private 구분 없이 다 조회해 온 뒤, 코드로 필터링
   * CASE 2: DB에서 public 채널만 조회 쿼리, private 채널 조회 쿼리를 따로 실행. 그리고 private 채널에 대해서만 코드로 필터링
   *
   * CONCLUSION: CASE 2. CASE 1보다 성능이 더 좋을 것으로 보임. DB에 무지성 전체 조회 보다는 private 여부에 인덱싱 걸어두어 성능 향상을 도모할 수 있을 듯.
   */

  try {
    // public 채널 조회
    const { data: publicChannels, error: publicChannelsError } = await supabase
      .from('channels')
      .select('id, name, description, is_private, created_at, password_hash')
      .eq('is_private', false)
      .order('created_at', { ascending: false });

    if (publicChannelsError) {
      console.error('Error fetching public channels:', publicChannelsError);
      return [];
    }

    // private 채널 조회 (사용자가 멤버인 채널만)
    let privateChannels: any[] = [];
    if (userId) {
      const { data: privateChannelsData, error: privateChannelsError } =
        await supabase
          .from('channels')
          .select(
            `
            id, name, description, is_private, created_at, password_hash,
            channel_members!inner(user_id)
          `,
          )
          .eq('is_private', true)
          .eq('channel_members.user_id', userId)
          .order('created_at', { ascending: false });

      if (privateChannelsError) {
        console.error('Error fetching private channels:', privateChannelsError);
        return [];
      } else {
        privateChannels = privateChannelsData || [];
      }
    }

    // 채널 통합
    const channels = [
      ...(publicChannels || []),
      ...(privateChannels || []),
    ].sort((a, b) =>
      a.created_at && b.created_at
        ? b.created_at.localeCompare(a.created_at)
        : 0,
    );

    if (channels.length === 0) {
      return [];
    }

    // 중복 제거 (private 채널의 경우 channel_members 조인으로 인한 중복 발생 가능)
    // set, map은 상태 격리, 누수 방지 해줘야함. 안그러면 이전의 호출결과가 다음 호출에 영향을 미칠 수 있음.
    const uniqueChannels = (() => {
      const seen = new Set();
      return (
        channels?.filter((channel) => {
          if (!channel || !channel.id) return false; // null/undefined 체크 추가
          if (seen.has(channel.id)) return false;
          seen.add(channel.id);
          return true;
        }) || []
      );
    })();

    // 각 채널의 멤버 수와 사용자 참여 여부 조회
    const channelsWithDetails = await Promise.all(
      uniqueChannels
        .filter((channel) => channel && channel.id) // null/undefined 체크 추가
        .map(async (channel) => {
          // 멤버 수 조회
          const { count: memberCount } = await supabase
            .from('channel_members')
            .select('*', { count: 'exact', head: true })
            .eq('channel_id', channel.id);

          // 사용자 참여 여부 조회 (userId가 있는 경우)
          let isJoined = false;
          if (userId) {
            const { data: membership } = await supabase
              .from('channel_members')
              .select('*')
              .eq('channel_id', channel.id)
              .eq('user_id', userId)
              .single();

            isJoined = !!membership;
          }

          const { passwordHash, ...rest } = channel
            ? [channel].map(objectMapper)[0]
            : {};

          return {
            ...rest,
            memberCount: memberCount || 0,
            isJoined,
            needsPassword: !!passwordHash,
          };
        }),
    );

    return channelsWithDetails.map(objectMapper) as Channel[];
  } catch (error) {
    console.error('Error in getAllChannels:', error);
    return [];
  }
}

// 채널 생성
export async function createChannel(
  channelData: CreateChannelRequest,
  userId: string,
): Promise<Channel | null> {
  const supabase = await serverSupabase();

  try {
    let hashedPassword = '';
    // 비밀번호 입력 시 hashedPassword 생성
    if (channelData.password) {
      hashedPassword = await bcrypt.hash(channelData.password, 10);
    }

    // 채널 생성
    const { data: channel, error: channelError } = await supabase
      .from('channels')
      .insert({
        name: channelData.name,
        description: channelData.description,
        is_private: channelData.isPrivate,
        created_by: userId,
        password_hash: hashedPassword,
      })
      .select()
      .single();

    if (channelError) {
      console.error('Error creating channel:', channelError);
      return null;
    }

    // 채널 생성자를 멤버로 추가
    const { error: memberError } = await supabase
      .from('channel_members')
      .insert({
        channel_id: channel.id,
        user_id: userId,
      });

    if (memberError) {
      console.error('Error adding creator as member:', memberError);
    }

    return {
      ...channel,
      memberCount: 1,
      isJoined: true,
    };
  } catch (error) {
    console.error('Error in createChannel:', error);
    return null;
  }
}

// 채널 참여
export async function joinChannel(
  joinData: JoinChannelRequest,
  userId: string,
): Promise<boolean> {
  const supabase = await serverSupabase();

  try {
    const { error } = await supabase.from('channel_members').insert({
      channel_id: joinData.channelId,
      user_id: userId,
    });

    if (error) {
      console.error('Error joining channel:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in joinChannel:', error);
    return false;
  }
}

// 채널 탈퇴
export async function leaveChannel(
  channelId: string,
  userId: string,
): Promise<boolean> {
  const supabase = await serverSupabase();

  try {
    const { error } = await supabase
      .from('channel_members')
      .delete()
      .eq('channel_id', channelId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error leaving channel:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in leaveChannel:', error);
    return false;
  }
}

export async function isValidChannel(
  channelId: string,
): Promise<Channel | null> {
  if (!channelId) {
    return null;
  }

  const supabase = await serverSupabase();
  const { data, error } = await supabase
    .from('channels')
    .select('*')
    .eq('id', channelId);

  if (error) {
    throw error;
  }

  if (!data || data.length === 0) {
    return null;
  }

  return {
    ...([data[0]].map(objectMapper)[0] as Channel),
    needsPassword: !!data[0].password_hash,
  };
}

export async function isUserJoinedChannel(
  channelId: string,
  userId: string,
): Promise<boolean> {
  if (!channelId || !userId) {
    return false;
  }

  const supabase = await serverSupabase();
  const { data: member, error: memberError } = await supabase
    .from('channel_members')
    .select('*')
    .eq('channel_id', channelId)
    .eq('user_id', userId);

  if (memberError) {
    throw memberError;
  }

  if (!member || member.length === 0) {
    return false;
  }

  return !!member;
}
