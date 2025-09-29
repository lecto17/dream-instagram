'use client';
import CheckPasswordModal from '@/components/modal/CheckPasswordModal';
import { useChannelHomeManageAction } from '@/hooks/useChannelHomeManageAction';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const CheckPasswordPage = () => {
  const { handleCheckPassword, handleParticipateChannel } =
    useChannelHomeManageAction({});

  const params = useParams();
  const [channelId, setChannelId] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setChannelId(params.channelId as string);
  }, [params.channelId]);

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <CheckPasswordModal
      onClose={() => {}}
      onConfirm={async (password) => {
        const trimmedPassword = password.trim();
        if (trimmedPassword === '') return;
        const isOk = await handleCheckPassword(trimmedPassword, channelId);
        if (!isOk) return;
        await handleParticipateChannel(channelId);
      }}
    />
  );
};

export default CheckPasswordPage;
