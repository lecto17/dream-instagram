'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MOOD_OPTIONS, MoodType, getMoodGradient } from '@/constants/mood';

interface MoodResultProps {
  moodData?: {
    [key in MoodType]: number;
  };
  myMood?: string;
  totalCounts?: number;
}

const MoodResult = ({ moodData, myMood, totalCounts }: MoodResultProps) => {
  const router = useRouter();

  // 임시 데이터 (실제로는 props로 받아올 데이터)
  const moodResults = moodData || {
    sunny: 25,
    autumn: 30,
    rainy: 15,
    winter: 10,
    spring: 20,
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="w-full min-h-full bg-gray-50 flex flex-col overflow-hidden">
      <div className="w-full flex flex-col justify-center p-2 sm:p-3">
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6">
          {/* 헤더 */}
          <div className="text-center mb-4 sm:mb-6">
            <h1 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 leading-tight">
              오늘의 기분 통계
            </h1>
            <p className="text-xs sm:text-sm text-gray-600">
              {totalCounts}명이 참여한 기분 조사 결과입니다
            </p>
          </div>

          {/* 내 기분 표시 */}
          {myMood && (
            <div className="mb-4 p-3 bg-blue-50 border-2 border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="text-xl">
                  {MOOD_OPTIONS.find((option) => option.id === myMood)?.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-blue-900 text-sm leading-tight">
                    나의 기분:{' '}
                    {MOOD_OPTIONS.find((option) => option.id === myMood)?.mood}
                  </div>
                  <div className="text-xs text-blue-700 leading-tight">
                    {
                      MOOD_OPTIONS.find((option) => option.id === myMood)
                        ?.description
                    }
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 통계 결과 */}
          <div className="space-y-2 sm:space-y-3 mb-4">
            {MOOD_OPTIONS.map((option) => {
              const count = moodResults[option.id] || 0;
              console.log('option.id: ', option.id, ', count: ', count);

              const percentage =
                (totalCounts || 0) > 0
                  ? Math.round((count / (totalCounts || 1)) * 100)
                  : 0;

              return (
                <div
                  key={option.id}
                  className={`p-2 sm:p-3 border-2 rounded-lg bg-gray-50 border-gray-200`}
                >
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                    <div className="text-xl sm:text-2xl flex-shrink-0">
                      {option.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-xs sm:text-sm leading-tight">
                        {option.mood}
                      </div>
                      <div className="text-xs text-gray-600 leading-tight">
                        {option.description}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm sm:text-base font-bold text-gray-900">
                        {percentage}%
                      </div>
                      <div className="text-xs text-gray-500">{count}명</div>
                    </div>
                  </div>

                  {/* 진행률 바 */}
                  <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${percentage}%`,
                        background: getMoodGradient(option.id),
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleGoHome}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium text-sm"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoodResult;
