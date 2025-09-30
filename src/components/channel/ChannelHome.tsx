'use client';

import { useState } from 'react';
import { Channel } from '@/types/channel';
import CreateChannelModal from '../modal/CreateChannelModal';

import CheckPasswordModal from '../modal/CheckPasswordModal';
import { useChannelHomeManageAction } from '@/hooks/useChannelHomeManageAction';
import ChannelList from './ChannelList';
import ChannelIntro from './ChannelIntro';

export default function ChannelHome({ channels }: { channels: Channel[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const {
    handleCheckPassword,
    handleParticipateChannel,
    handleChannelAction,
    handleChannelCreated,
    handleSetActiveChannelId,
  } = useChannelHomeManageAction({ setModalOpen: setIsPasswordModalOpen });

  return (
    <div className="w-full h-full max-w-2xl mx-auto p-4 flex flex-col">
      {/* 인트로 섹션 */}
      <ChannelIntro setIsModalOpen={setIsModalOpen} />

      {/* 채널 목록 */}
      <ChannelList
        channels={channels}
        handleSetActiveChannelId={handleSetActiveChannelId}
        setIsPasswordModalOpen={setIsPasswordModalOpen}
        handleChannelAction={handleChannelAction}
        handleParticipateChannel={handleParticipateChannel}
      />

      {/* 채널 생성 모달 */}
      <CreateChannelModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onChannelCreated={handleChannelCreated}
      />

      {/* 채널 비밀번호 모달 */}
      {isPasswordModalOpen && (
        <CheckPasswordModal
          onClose={() => setIsPasswordModalOpen(false)}
          onConfirm={async (password) => {
            const trimmedPassoword = password.trim();

            if (trimmedPassoword === '') {
              return;
            }

            const isOk = await handleCheckPassword(trimmedPassoword);
            if (!isOk) return;

            await handleParticipateChannel();
          }}
        />
      )}
    </div>
  );
}
