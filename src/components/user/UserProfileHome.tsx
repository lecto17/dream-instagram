'use client';

// import Avatar from '@/components/avatar/Avatar';
// import FollowButton from '@/components/button/FollowButton';
// import useProfileUser from '@/hooks/useProfileUser';
// import useUser from '@/hooks/useUser';
// import { UserProfile } from '@/types/user';

// type Props = {
//   username: string;
//   user?: UserProfile;
// };

// const textStyle = 'text-center sm:text-left';
const UserProfileHome = () => {
  // const UserProfileHome = ({ username }: Props) => {
  // const { user, setFollowing } = useUser();
  // const { profileUser } = useProfileUser(username);
  // if (!profileUser) return;
  // const {
  //   id: profileUserId,
  //   followers,
  //   following,
  //   image,
  //   name,
  //   posts,
  // } = profileUser;
  // return (
  //   <div className="flex flex-col w-full items-center">
  //     <section className="flex flex-col w-full justify-center items-center py-8 mb-10 sm:flex-row">
  //       <Avatar user={{ username, image }} size="ultra" />
  //       <div className="flex flex-col space-y-2 mb-3 sm:m-0 sm:mr-2 sm:ml-7">
  //         <h1 className={`text-2xl ${textStyle}`}>{username}</h1>
  //         <p className="flex space-x-3 text-sm">
  //           <span className="font-bold">{posts ?? 0}</span> &nbsp;posts
  //           <span className="font-bold">{following ?? 0}</span> &nbsp;following
  //           <span className="font-bold">{followers ?? 0}</span> &nbsp;followers
  //         </p>
  //         <p className={`text-2xl font-bold ${textStyle}`}>{name}</p>
  //       </div>
  //       <FollowButton
  //         profileUsername={username}
  //         profileUserId={profileUserId!}
  //         user={user}
  //         setFollowing={setFollowing}
  //       />
  //     </section>
  //   </div>
  // );
};

export default UserProfileHome;
