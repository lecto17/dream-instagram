import { getAuthenticatedUser } from '@/actions/action';
import GlobalNav from '@/components/navigation/GlobalNav';
import SWRConfigContext from '@/context/SWRConfigContext';
import { getMyProfile } from '@/service/supa-user';
import { redirect } from 'next/navigation';

const layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ channelId: string }>;
}) => {
  const user = await getAuthenticatedUser();
  if (!user) return redirect('/auth/login');

  const { channelId } = await params;

  const myProfile = await getMyProfile(user.id, channelId);
  // if (myProfile == null || myProfile?.userName == null) {
  //   return redirect(`/channels/${channelId}/onboarding?step=1`);
  // }

  return (
    <>
      {/* <AuthContext> */}
      <div className="max-w-screen-lg mx-auto h-16">
        <GlobalNav
          user={myProfile}
          channelId={channelId}
        />
      </div>
      <main className="w-full h-[calc(100%-64px)] flex justify-center">
        <SWRConfigContext>{children}</SWRConfigContext>
      </main>
      {/* </AuthContext> */}
    </>
  );
};

export default layout;
