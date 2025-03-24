import PostModal from "@/components/modal/PostModal";
import ModalPortal from "@/components/portal/ModalPortal";
import PostDetail from "@/components/posts/PostDetail";
import { SimplePost } from "@/types/post";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";

type Props = {
  post: SimplePost;
};

const PostGridCard = ({
  post: { image, userImage, username, id, likes, createdAt, text },
}: Props) => {
  const [showable, setShowable] = useState(false);
  const { data: session } = useSession();

  const handleLClickPost = () => {
    if (!session?.user) {
      redirect("/auth/login");
    }

    setShowable(true);
  };

  return (
    <li className="cursor-pointer" onClick={handleLClickPost}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={username + "'s article"}
        className="aspect-square object-cover"
      />
      {showable && (
        <ModalPortal>
          <PostModal onClose={() => setShowable(false)}>
            <PostDetail
              key={id}
              id={id}
              createdAt={createdAt}
              image={image}
              likes={likes}
              text={text}
              userImage={userImage}
              username={username}
            />
          </PostModal>
        </ModalPortal>
      )}
    </li>
  );
};

export default PostGridCard;
