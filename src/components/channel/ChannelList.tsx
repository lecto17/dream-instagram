import { Channel } from '@/types/channel';
import ChannelItem from './ChannelItem';

type ChannelListProps = {
  channels: Channel[];
  handleSetActiveChannelId: (channelId: string) => void;
  setIsPasswordModalOpen: (isOpen: boolean) => void;
  handleChannelAction: (
    e: React.MouseEvent<HTMLButtonElement>,
    channelId: string,
    action: 'PARTICIPATE' | 'LEAVE',
    joinedStatus: boolean,
    needsPassword?: boolean,
  ) => void;
};

const ChannelList = ({
  channels,
  handleSetActiveChannelId,
  setIsPasswordModalOpen,
  handleChannelAction,
}: ChannelListProps) => {
  return (
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
            <ChannelItem
              key={channel.id}
              channel={channel}
              handleSetActiveChannelId={handleSetActiveChannelId}
              setIsPasswordModalOpen={setIsPasswordModalOpen}
              handleChannelAction={handleChannelAction}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default ChannelList;
