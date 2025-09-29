// import { auth } from '/auth';
import { serverSupabase } from '@/lib/supabaseServerClient';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { isUserJoinedChannel, isValidChannel } from '@/service/supa-channel';

// export const validateSession = async (): Promise<User | undefined> => {
//   'use server';
//   const session = await auth();
//   const user = session?.user;

//   if (!user) {
//     return;
//   }

//   return user;
// };

export const getAuthenticatedUser = async (token?: string) => {
  const supabase = await serverSupabase(token);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};

export const getAuthenticatedUserSession = async () => {
  const supabase = await serverSupabase();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
};

export const login = async (formData: FormData) => {
  'use server';
  const supabase = await serverSupabase();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect('/error');
  }
  revalidatePath('/', 'layout');
  redirect('/');
};

export const signup = async (formData: FormData) => {
  'use server';
  const supabase = await serverSupabase();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    redirect('/error');
  }
  revalidatePath('/', 'layout');
  redirect('/');
};

export const getValidationOnChannel = async (
  channelId: string,
  userId: string,
) => {
  // 채널 ID null인 경우 채널 목록으로 redirect
  if (channelId == null) {
    return redirect('/channels');
  }

  // 채널 유효성 검사
  const validChannel = await isValidChannel(channelId);
  if (validChannel == null) {
    return redirect('/channels');
  }

  // 채널 참여 여부 확인
  const isJoined = await isUserJoinedChannel(channelId, userId);
  // 비밀번호가 필요한 채널에 user가 처음 접속하는 경우
  if (validChannel.needsPassword && !isJoined) {
    return redirect(`/channels/${channelId}/check-password`);
  }
};
