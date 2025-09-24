'use client';

const ServiceGuidelines = () => {
  return (
    <div className="w-full bg-gray-50">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-3 sm:p-6 mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            서비스 가이드라인
          </h1>
          <p className="text-gray-600">
            서비스 이용 전 주의사항을 확인해주세요
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {/* 서비스 사용 주의사항 */}
          <section className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-blue-600"
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
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                서비스 사용 주의사항
              </h2>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-2 sm:p-3 rounded-r-md">
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>
                    다른 사용자에게 불쾌감을 주는 콘텐츠는 업로드하지 마세요
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>민감한 정보나 저작권이 있는 콘텐츠는 업로드 금지</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>스팸이나 광고성 콘텐츠는 금지됩니다</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>타인을 비방하거나 괴롭히는 행위는 금지됩니다</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 닉네임 설정 가이드라인 */}
          <section className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                닉네임 설정 가이드라인
              </h2>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-2 sm:p-3 rounded-r-md">
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 font-bold">•</span>
                  <span>개인정보가 포함되어 있지 않도록 설정해주세요</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 font-bold">•</span>
                  <span>다른 사용자와 중복될 수 있습니다</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 font-bold">•</span>
                  <span>나중에 프로필 설정에서 변경할 수 있습니다</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 추가 안내사항 */}
          <section className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                추가 안내사항
              </h2>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-2 sm:p-3 rounded-r-md">
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>
                    서비스 이용 중 문제가 발생하면 고객센터로 문의해주세요
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>
                    가이드라인을 위반할 경우 계정이 제재될 수 있습니다
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>서비스 정책은 필요에 따라 변경될 수 있습니다</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 확인 버튼 */}
          {/* <div className="pt-3 sm:pt-4 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm text-gray-600">
              <input
                type="checkbox"
                id="agree-guidelines"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor="agree-guidelines"
                className="cursor-pointer"
              >
                위 가이드라인을 확인했으며, 서비스 이용에 동의합니다
              </label>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ServiceGuidelines;
