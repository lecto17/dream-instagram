import { getAuthenticatedUser } from '@/actions/action';
import Onboarding from '@/components/pages/Onboarding';
import { redirect } from 'next/navigation';

export default async function OnboardingPage() {
  const user = await getAuthenticatedUser();
  if (user == null) return redirect('/auth/login');

  return <Onboarding />;
}
