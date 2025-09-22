'use client';

import { useRouter } from 'next/navigation';

const OnboardingComplete = () => {
  const router = useRouter();

  const handleComplete = () => {
    router.push('/');
  };

  return (
    <div className="min-h-full bg-gray-50 flex items-center justify-center p-2">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            온보딩 완료!
          </h1>
          <p className="text-gray-600">
            프로필 설정이 완료되었습니다.
            <br />
            이제 서비스를 이용하실 수 있습니다.
          </p>
        </div>

        <div className="space-y-4">
          {/* 완료된 항목들 */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              완료된 설정
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>서비스 가이드라인 확인</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>프로필 정보 설정</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>계정 활성화</span>
              </li>
            </ul>
          </div>

          {/* 다음 단계 안내 */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-md">
            <div className="flex items-start space-x-2">
              <svg
                className="w-5 h-5 text-blue-500 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h4 className="text-sm font-medium text-blue-900">다음 단계</h4>
                <p className="text-xs text-blue-700 mt-1">
                  홈 화면에서 첫 번째 게시물을 작성해보세요!
                </p>
              </div>
            </div>
          </div>

          {/* 완료 버튼 */}
          <button
            onClick={handleComplete}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            서비스 시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingComplete;
