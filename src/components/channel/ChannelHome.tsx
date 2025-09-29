'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Channel } from '@/types/channel';
import CreateChannelModal from '../modal/CreateChannelModal';
import { useRouter } from 'next/navigation';

import CheckPasswordModal from '../modal/CheckPasswordModal';
import { useChannelHomeManageAction } from '@/hooks/useChannelHomeManageAction';

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
      <div className="text-center mb-4">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-xl">🏠</span>
        </div>
        <h1 className="text-xl font-semibold text-gray-800 mb-1">
          환영합니다!
        </h1>
        <p className="text-gray-600 text-xs leading-relaxed">
          관심 있는 채널에 참여하거나 새로운 채널을 만들어보세요
        </p>
      </div>

      {/* 채널 개설 버튼 */}
      <div className="mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full h-10 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <span className="text-sm">+</span>
          <span className="font-medium text-sm">새 채널 만들기</span>
        </button>
      </div>

      {/* 채널 목록 */}
      <div className="flex-1 flex flex-col min-h-0">
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          참여 가능한 채널
        </h2>

        {/* {channels.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-gray-500 text-sm">채널을 불러오는 중...</div>
          </div>
        ) : ( */}
        <ul className="flex-1 space-y-3 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {channels.length === 0 ? (
            <div className="flex-1 flex h-full items-center justify-center">
              <div className="text-center">
                <div className="text-gray-400 text-sm mb-2">
                  아직 채널이 없어요
                </div>
                <div className="text-gray-300 text-xs">
                  새 채널을 만들어보세요!
                </div>
              </div>
            </div>
          ) : (
            channels.map((channel) => (
              <li
                key={channel.id}
                className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow duration-200 cursor-pointer"
              >
                <Link
                  href={`/channels/${channel.id}`}
                  className="flex items-start justify-between"
                  onClick={(e) => {
                    if (channel.needsPassword && !channel.isJoined) {
                      e.preventDefault();
                      handleSetActiveChannelId(channel.id);
                      setIsPasswordModalOpen(true);
                    }
                  }}
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-800 text-sm">
                        {channel.name}
                      </h3>
                      {channel.isJoined && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          참여중
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-xs mb-2">
                      {channel.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>👥 {channel.memberCount}명</span>
                      <span>
                        {channel.needsPassword ? '🔒 (비밀번호 필요)' : ''}
                      </span>
                    </div>
                  </div>

                  <div className="ml-3">
                    {channel.isJoined ? (
                      <button
                        onClick={(e) =>
                          handleChannelAction(
                            e,
                            channel.id,
                            'LEAVE',
                            channel.isJoined,
                          )
                        }
                        className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs rounded-lg transition-colors duration-200"
                      >
                        탈퇴하기
                      </button>
                    ) : (
                      <button
                        onClick={(e) =>
                          handleChannelAction(
                            e,
                            channel.id,
                            'PARTICIPATE',
                            channel.isJoined,
                            channel.needsPassword,
                          )
                        }
                        className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 text-white text-xs rounded-lg transition-colors duration-200"
                      >
                        {channel.isJoined ? '입장하기' : '참여하기'}
                      </button>
                    )}
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
        {/* )} */}
      </div>

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
