import UserProfile from '@/components/pages/UserProfile';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async ({ params } : { params: Promise<{ channelId: string }> })  => {
  const { channelId } = await params;
  if (channelId == null) return redirect('/channels');

  return <UserProfile channelId={channelId} />;
};

export default page;