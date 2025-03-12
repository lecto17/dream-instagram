"use client";

import Avatar from "@/components/avatar/Avatar";
import CommentForm from "@/components/comment/CommentForm";
import BookMarkIcon from "@/components/icons/BookMarkIcon";
import HeartIcon from "@/components/icons/HeartIcon";
import PostModal from "@/components/modal/PostModal";
import ModalPortal from "@/components/portal/ModalPortal";
import PostDetail from "@/components/posts/PostDetail";
import { SimplePost } from "@/types/post";
import { parseDate } from "@/utils/utils";
import { useState } from "react";

interface PostCardProps {
  post: SimplePost;
  priority?: boolean;
}

const location = "Incheon, Korea";

const PostCard = ({
  post: { id, createdAt, image, likes, text, userImage, username },
  priority,
}: PostCardProps) => {
  const [showable, setShowable] = useState(false);

  const handleClickImage = () => {
    setShowable(true);
  };

  return (
    <article className="max-w-[468px] border border-gray-200 shadow-md rounded-lg p-3 mb-3">
      <div className="flex w-fit items-center mb-3">
        <Avatar user={{ username, image: userImage }} size="small" />
        <p className="flex flex-col ml-2 text-base text-gray-700">
          <span className="font-semibold">{username}</span>
          <span className="text-xs leading-3 text-gray-500">{location}</span>
        </p>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="w-full object-cover aspect-square hover:cursor-pointerr"
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
        <BookMarkIcon />
        <HeartIcon />
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
