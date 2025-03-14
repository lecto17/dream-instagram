import UserProfileHome from "@/components/user/UserProfileHome";

type Props = {
  params: Promise<{ username: string }>;
};

const page = async ({ params }: Props) => {
  const { username } = await params;

  return (
    <div className="w-full max-w-[850px]">
      <UserProfileHome propUserName={username} />
    </div>
  );
};

export default page;
