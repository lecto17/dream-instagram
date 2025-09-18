'use client';

import { createClient } from '@/lib/supabaseBrowserClient';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useAuthErrorReset = () => {
  // 인증 관련 상태만 안전하게 초기화
  const resetAuthState = async () => {
    try {
      await createClient().auth.signOut();
    } catch (_) {}
    // 현재 도메인의 모든 쿠키 가져오기
    const cookies = document.cookie.split(';');
    cookies.forEach((cookie) => {
      const eqPos = cookie.indexOf('=');
      const name =
        eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
      // 인증 관련 쿠키만 제거 (예: supabase/next-auth)
      if (/^(sb-|supabase|next-auth)/.test(name)) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
      }
    });
    // 인증 관련 스토리지만 정리
    try {
      localStorage.removeItem('sb-auth-token');
    } catch {}
    try {
      sessionStorage.clear();
    } catch {}
  };
  // 컴포넌트가 마운트될 때 쿠키 지우기
  useEffect(() => {
    resetAuthState();
  }, []);
};

const AuthError = () => {
  useAuthErrorReset();
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        {/* 에러 아이콘 */}
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <svg
            className="h-6 w-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        {/* 에러 메시지 */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          인증 오류가 발생했습니다
        </h1>
        <p className="text-gray-600 mb-6">
          로그인 과정에서 문제가 발생했습니다. 다시 시도해주세요.
        </p>

        {/* 액션 버튼들 */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => router.push('/auth/login')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            다시 로그인하기
          </button>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            홈으로 돌아가기
          </button>
        </div>

        {/* 도움말 */}
        <div className="mt-6 text-sm text-gray-500">
          <p>문제가 지속되면 고객지원에 문의해주세요.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthError;
