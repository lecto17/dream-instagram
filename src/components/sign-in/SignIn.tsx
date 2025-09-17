'use client';

import { createClient } from '@/lib/supabaseBrowserClient';

const SignIn = () => {
  const _signInWithKakao = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
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
        className="p-[2px] rounded-md border border-black bg-yellow-100"
        onClick={_signInWithKakao}
      >
        Sign in with Kakao
      </button>
    </>
  );
};

export default SignIn;
