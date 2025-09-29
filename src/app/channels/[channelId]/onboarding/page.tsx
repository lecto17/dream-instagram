import { getAuthenticatedUser } from '@/actions/action';
import Onboarding from '@/components/pages/onboarding/Onboarding';
import { redirect } from 'next/navigation';

export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ channelId: string }>;
}) {
  const user = await getAuthenticatedUser();
  if (user == null) return redirect('/auth/login');

  const { channelId } = await params;

  // const profile = await getMyProfile(user.id, channelId);
  // if (profile?.userName != null) {
  //   return redirect('/');
  // }

  return <Onboarding channelId={channelId} />;
}
