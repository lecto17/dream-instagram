import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '@/actions/action';
import { isUserJoinedChannel, isValidChannel } from '@/service/supa-channel';

type Props = {
  params: Promise<{ channelId: string }>;
};

const page = async ({ params }: Props) => {
  const user = await getAuthenticatedUser();
  if (!user) {
    return redirect('/auth/login');
  }

  const { channelId } = await params;

  if (channelId == null) {
    return redirect('/channels');
  }

  // 채널 ID 유효성 검사
  const validChannel = await isValidChannel(channelId);
  if (validChannel == null) {
    return redirect('/channels');
  }

  // 사용자 채널 참여 여부 확인
  const isJoined = await isUserJoinedChannel(channelId, user.id);

  if (validChannel.needsPassword && !isJoined) {
    return redirect(`/channels/${channelId}/check-password`);
  }

  return <div>{channelId} page</div>;
};

export default page;
