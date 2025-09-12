import { User } from '@/types/user';
// import { auth } from '/auth';
import { serverSupabase } from '@/lib/supabaseServerClient';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// export const validateSession = async (): Promise<User | undefined> => {
//   'use server';
//   const session = await auth();
//   const user = session?.user;

//   if (!user) {
//     return;
//   }

//   return user;
// };

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
