import { Channel } from '@/types/channel';
import Link from 'next/link';

type ChannelItemProps = {
  channel: Channel;
  handleSetActiveChannelId: (channelId: string) => void;
  setIsPasswordModalOpen: (isOpen: boolean) => void;
  handleChannelAction: (
    e: React.MouseEvent<HTMLButtonElement>,
    channelId: string,
    action: 'PARTICIPATE' | 'LEAVE',
    joinedStatus: boolean,
    needsPassword?: boolean,
  ) => void;
  handleParticipateChannel: (channelId: string) => void;
};

export default function ChannelItem({
  channel,
  handleSetActiveChannelId,
  setIsPasswordModalOpen,
  handleChannelAction,
  handleParticipateChannel,
}: ChannelItemProps) {
  return (
    <li
      key={channel.id}
      className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 cursor-pointer"
    >
      <Link
        href={`/channels/${channel.id}`}
        className="flex items-start justify-between p-3"
        onClick={(e) => {
          if (channel.needsPassword && !channel.isJoined) {
            e.preventDefault();
            handleSetActiveChannelId(channel.id);
            setIsPasswordModalOpen(true);
          }
          if (!channel.needsPassword && !channel.isJoined) {
            handleParticipateChannel(channel.id);
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
          <p className="text-gray-600 text-xs mb-2">{channel.description}</p>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>👥 {channel.memberCount}명</span>
            <span>{channel.needsPassword ? '🔒 (비밀번호 필요)' : ''}</span>
          </div>
        </div>

        <div className="ml-3">
          {channel.isJoined ? (
            <button
              onClick={(e) =>
                handleChannelAction(e, channel.id, 'LEAVE', channel.isJoined)
              }
              className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs rounded-lg transition-colors duration-200"
            >
              탈퇴하기
            </button>
          ) : (
            <button
              onClick={(e) => {
                if (channel.needsPassword && !channel.isJoined) {
                  e.preventDefault();
                  handleSetActiveChannelId(channel.id);
                  setIsPasswordModalOpen(true);
                  return;
                }
                if (!channel.needsPassword && !channel.isJoined) {
                  handleParticipateChannel(channel.id);
                  return;
                }
                handleChannelAction(
                  e,
                  channel.id,
                  'PARTICIPATE',
                  channel.isJoined,
                  channel.needsPassword,
                );
              }}
              className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 text-white text-xs rounded-lg transition-colors duration-200"
            >
              {channel.isJoined ? '입장하기' : '참여하기'}
            </button>
          )}
        </div>
      </Link>
    </li>
  );
}
