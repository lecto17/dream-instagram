import { getAuthenticatedUser } from '@/actions/action';
import Onboarding from '@/components/pages/onboarding/Onboarding';
import { getMyProfile } from '@/service/supa-user';
import { redirect } from 'next/navigation';

export default async function OnboardingPage() {
  const user = await getAuthenticatedUser();
  if (user == null) return redirect('/auth/login');

  const profile = await getMyProfile(user.id);
  if (profile?.userName != null) {
    return redirect('/');
  }

  return <Onboarding />;
}
