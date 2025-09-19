'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const MOOD_OPTIONS = [
  {
    id: 'sunny',
    emoji: '☀️',
    weather: '맑고 화창한 여름',
    description: '상쾌하고 활기찬',
    value: 'sunny',
  },
  {
    id: 'autumn',
    emoji: '🍂',
    weather: '선선한 가을',
    description: '차분하고 여유로운',
    value: 'autumn',
  },
  {
    id: 'rainy',
    emoji: '🌧',
    weather: '장마철 비 오는 날',
    description: '조금 축 처지고 무거운',
    value: 'rainy',
  },
  {
    id: 'winter',
    emoji: '❄️',
    weather: '겨울밤 눈 내리는 날',
    description: '고요하고 외로운',
    value: 'winter',
  },
  {
    id: 'spring',
    emoji: '🌸🌦',
    weather: '변덕스러운 봄날',
    description: '들떴지만 불안정한',
    value: 'spring',
  },
];

const useMoodVote = () => {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) return;

    setIsLoading(true);
    try {
      // TODO: API 호출로 기분 데이터 저장
      console.log('Selected mood:', selectedMood);

      // 임시로 홈으로 이동
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (error) {
      console.error('Mood selection failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit, selectedMood, setSelectedMood, isLoading };
};

const Mood = () => {
  const { handleSubmit, selectedMood, setSelectedMood, isLoading } =
    useMoodVote();

  return (
    <div className="min-h-full bg-gray-50 flex flex-col">
      {/* 모바일에서 상단 여백 */}
      <div className="flex items-center justify-center p-3 sm:p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 leading-tight">
              오늘 당신의 기분은 어떤 날씨 같나요?
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              마음의 날씨를 선택해주세요
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-3 sm:space-y-4"
          >
            {/* 기분 선택 라디오 그룹 */}
            <div className="space-y-2 sm:space-y-3">
              {MOOD_OPTIONS.map((option) => (
                <label
                  key={option.id}
                  className={`block p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedMood === option.value
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="mood"
                    value={option.value}
                    checked={selectedMood === option.value}
                    onChange={(e) => setSelectedMood(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="text-2xl sm:text-3xl flex-shrink-0">
                      {option.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm sm:text-base leading-tight">
                        {option.weather}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 leading-tight mt-1">
                        {option.description}
                      </div>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                        selectedMood === option.value
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedMood === option.value && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </div>
                </label>
              ))}
            </div>

            {/* 제출 버튼 */}
            <div className="flex pt-2">
              <button
                type="submit"
                disabled={!selectedMood || isLoading}
                className="w-full bg-blue-500 text-white py-2.5 sm:py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm sm:text-base"
              >
                {isLoading ? '저장 중...' : '기분 저장하기'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Mood;
