type ChannelIntroProps = {
  setIsModalOpen: (isOpen: boolean) => void;
};

const ChannelIntro = ({ setIsModalOpen }: ChannelIntroProps) => {
  return (
    <>
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
    </>
  );
};

export default ChannelIntro;
