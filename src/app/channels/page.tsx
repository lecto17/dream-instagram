import ChannelHome from '@/components/channel/ChannelHome';
import { getAuthenticatedUser } from '@/actions/action';
import { redirect } from 'next/navigation';
import { getAllChannels } from '@/service/supa-channel';

const page = async () => {
  const user = await getAuthenticatedUser();
  if (!user) {
    return redirect('/auth/login');
  }

  const channels = await getAllChannels(user.id);
  return <ChannelHome channels={channels} />;
};

export default page;
