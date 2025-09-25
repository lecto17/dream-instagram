'use client';

import { createClient } from '@/lib/supabaseBrowserClient';
import { getAppUrl } from '@/utils/env';

const SignIn = () => {
  const _signInWithKakao = async () => {
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${getAppUrl()}/auth/callback`,
      },
    });
  };

  return (
    <div className="w-full h-full flex flex-col items-center py-[10%] max-w-sm mx-auto">
      {/* 서비스 타이틀 */}
      <div className="text-center mb-4 sm:mb-12">
        <h1 className="text-2xl font-light text-gray-800 mb-3">
          Share your Voice
          {/* 당신의 이야기를 들려주세요. */}
        </h1>
        <p className="text-gray-500 text-sm">
          말하지 못한 이야기들을 나눠보세요
        </p>
      </div>

      {/* 서비스 소개 */}
      <div className="flex flex-col items-center bg-white rounded-lg p-8 pt-4 sm:pt-8 mb-8 shadow-sm border border-gray-100">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💭</span>
          </div>
          <h2 className="text-lg font-medium text-gray-800 mb-2">
            조용한 공간에서
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            마음 속에만 담아두었던 이야기들을
            <br />
            익명으로 나눌 수 있는 곳입니다
          </p>
        </div>

        {/* 기능 소개 */}
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
            <span>진심 어린 공감과 위로</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
            <span>조용하고 따뜻한 커뮤니티</span>
          </div>
        </div>
      </div>

      {/* 하단 영역(로그인 버튼, 안내) - flex-1로 남은 공간 차지 */}
      <div className="w-full flex flex-col items-center flex-1 justify-end">
        <button
          className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          onClick={_signInWithKakao}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 0C4.03 0 0 3.42 0 7.64c0 2.84 1.89 5.34 4.72 6.78L3.5 18l4.25-2.25c.89.15 1.83.25 2.75.25 4.97 0 9-3.42 9-7.64S13.97 0 9 0z"
              fill="currentColor"
            />
          </svg>
          <span className="font-medium">카카오로 시작하기</span>
        </button>

        {/* 하단 안내 */}
        <p className="text-center text-xs text-gray-400 mt-3">
          모든 이야기들은 익명(닉네임)으로 공유됩니다.
        </p>
      </div>
    </div>
  );
};

export default SignIn;
