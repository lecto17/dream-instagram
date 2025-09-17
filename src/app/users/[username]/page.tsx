// import UserProfileHome from "@/components/user/UserProfileHome";
// import UserProfileTab from "@/components/user/UserProfileTab";
// import { getUserAllInformation } from '@/service/user';
// import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ username: string }>;
};

export const revalidate = 0;

const page = async ({ params }: Props) => {
  const { username } = await params;
  // const user = await getUserAllInformation(username);

  // if (!user) notFound();

  return (
    <div className="w-full max-w-[850px]">
      {/* <UserProfileHome username={username} />
      <UserProfileTab username={username} /> */}
    </div>
  );
};

export default page;
