"use client";

import ToggleButton from "@/components/button/ToggleButton";
import CommentForm from "@/components/comment/CommentForm";
import BookMarkIcon from "@/components/icons/BookMarkIcon";
import BookMarkIconFilled from "@/components/icons/BookMarkIconFilled";
import HeartIcon from "@/components/icons/HeartIcon";
import HeartIconFilled from "@/components/icons/HeartIconFilled";
import PostModal from "@/components/modal/PostModal";
import ModalPortal from "@/components/portal/ModalPortal";
import PostDetail from "@/components/posts/PostDetail";
import PostUserAvatar from "@/components/posts/PostUserAvatar";
import { SimplePost } from "@/types/post";
import { parseDate } from "@/utils/utils";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface PostCardProps {
  post: SimplePost;
  priority?: boolean;
}

const location = "Incheon, Korea";

const PostCard = ({ post, priority }: PostCardProps) => {
  const [showable, setShowable] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleClickImage = () => {
    setShowable(true);
  };

  const { id, createdAt, image, likes, text, userImage, username } = post;
  console.log("likes: ", likes, user?.name);

  return (
    <article className="border border-gray-200 shadow-md rounded-lg p-3 mb-3">
      <div className="flex w-fit items-center mb-3">
        <PostUserAvatar user={{ username, image }} location={location} />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="max-w-[468px] object-cover aspect-square hover:cursor-pointerr"
        src={image}
        width={468}
        height={565}
        alt={`photo by ${username}`}
        fetchPriority={priority ? "high" : "low"}
        onClick={handleClickImage}
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
      <div className="flex py-2 justify-between">
        <ToggleButton
          offIcon={<HeartIcon />}
          onIcon={<HeartIconFilled />}
          toggled={liked}
          onToggle={setLiked}
        />

        <ToggleButton
          offIcon={<BookMarkIcon />}
          onIcon={<BookMarkIconFilled />}
          toggled={bookmarked}
          onToggle={setBookmarked}
        />
      </div>
      <div>
        <p>
          {likes?.length ?? 0}
          {likes?.length > 1 ? " likes" : " like"}
        </p>
        <p className="flex items-center">
          <span className="font-bold mr-2">{username}</span>
          {text}
        </p>
        <p className="mb-5">{parseDate(createdAt)}</p>
        <CommentForm />
      </div>
    </article>
  );
};

export default PostCard;
