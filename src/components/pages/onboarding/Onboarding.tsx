'use client';

import UserProfile from '../UserProfile';
import SwitchCases from '../../ui/SwitchCases';
import { useSearchParams, useRouter } from 'next/navigation';
import ServiceGuidelines from './ServiceGuidelines';
import OnboardingComplete from './OnboardingComplete';

const TOTAL_STEPS = 2; // 전체 step 수

export default function Onboarding({ channelId }: { channelId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = Number(searchParams.get('step'));
  const prefixUrl = `/channels/${channelId}/onboarding`;

  const handlePrevious = () => {
    if (step > 1) {
      const newStep = step - 1;
      router.push(`${prefixUrl}?step=${newStep}`);
    }
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      const newStep = step + 1;
      router.push(`${prefixUrl}?step=${newStep}`);
    }
  };

  return (
    <div className="relative min-h-full">
      {/* 이전 버튼 - 모바일에서는 하단 고정 */}
      {step > 1 && (
        <button
          onClick={handlePrevious}
          className="absolute -left-1 sm:-left-2 top-1/2 sm:top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-50 transition-colors"
          aria-label="이전 단계"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {/* 메인 컨텐츠 - 스크롤 가능하도록 수정 */}
      <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-2 sm:py-4">
        <SwitchCases
          step={step}
          cases={{
            1: <ServiceGuidelines />,
            2: <UserProfile channelId={channelId} />,
            3: <OnboardingComplete />,
          }}
        />
      </div>

      {/* 다음 버튼 - 모바일에서는 하단 고정 */}
      {step < TOTAL_STEPS && (
        <button
          onClick={handleNext}
          className="absolute -right-1 sm:-right-2 top-1/2 sm:top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-50 transition-colors"
          aria-label="다음 단계"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}

      {/* Step 인디케이터 - 모바일에서는 하단 고정 */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {Array.from({ length: TOTAL_STEPS }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => {
              router.push(`${prefixUrl}?step=${index + 1}`);
            }}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
              step === index + 1
                ? 'bg-blue-500'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`${index + 1}단계로 이동`}
          />
        ))}
      </div>
    </div>
  );
}
