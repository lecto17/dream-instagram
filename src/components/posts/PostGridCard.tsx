import PostModal from '@/components/modal/PostModal';
import ModalPortal from '@/components/portal/ModalPortal';
import PostDetail from '@/components/posts/PostDetail';
import useUser from '@/hooks/useUser';
import { createClient } from '@/lib/supabaseBrowserClient';
import { SupaPost } from '@/types/post';
import { redirect } from 'next/navigation';
import { useState } from 'react';

type Props = {
  post: SupaPost;
};

const PostGridCard = ({ post }: Props) => {
  const [showable, setShowable] = useState(false);
  const user = createClient().auth.getUser();
  const { user: userProfile } = useUser();

  const handleLClickPost = () => {
    if (user == null) {
      redirect('/auth/login');
    }

    setShowable(true);
  };

  return (
    <li
      className="cursor-pointer"
      onClick={handleLClickPost}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={post.imageKey}
        alt={userProfile?.userName + "'s article"}
        className="aspect-square object-cover"
      />
      {showable && (
        <ModalPortal>
          <PostModal onClose={() => setShowable(false)}>
            <PostDetail
              key={post.id}
              post={post}
            />
          </PostModal>
        </ModalPortal>
      )}
    </li>
  );
};

export default PostGridCard;
