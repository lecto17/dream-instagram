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
    <>
      {/* <form className="flex flex-col">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          required
        />
        <button formAction={login}>Log in</button>
        <button formAction={signup}>Sign up</button>
      </form> */}
      <button
        className="flex items-center justify-center w-full h-12 px-4 bg-yellow-400 hover:bg-yellow-500 transition-colors duration-200 rounded-lg border border-yellow-400 shadow-sm"
        onClick={_signInWithKakao}
      >
        <div className="flex items-center space-x-2">
          {/* 카카오 아이콘 */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 0C4.03 0 0 3.42 0 7.64c0 2.84 1.89 5.34 4.72 6.78L3.5 18l4.25-2.25c.89.15 1.83.25 2.75.25 4.97 0 9-3.42 9-7.64S13.97 0 9 0z"
              fill="#000000"
            />
          </svg>
          <span className="text-[#000000] font-medium text-sm">
            카카오로 시작하기
          </span>
        </div>
      </button>
    </>
  );
};

export default SignIn;
